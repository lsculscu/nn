import React from 'react';
import { renderToString } from 'react-dom/server';
import ServerHTML from './server-html';
import universalRender from '../shared/UniversalRender';
import models from 'db/models';

const DB_RECONNECT_TIMEOUT = process.env.NODE_ENV === 'development' ? 1000 * 60 * 60 : 1000 * 60 * 10;

async function router(ctx) {
    const store = {};
    try {
        const offchain = {
            csrf: ctx.csrf,
            flash: ctx.flash,
            new_visit: ctx.session.new_visit,
            account: ctx.session.a,
            config: $STM_Config
        };
        const user_id = ctx.session.user;
        if (user_id) {
            let user = null;
            if (router.dbStatus.ok || (new Date() - router.dbStatus.lastAttempt) > DB_RECONNECT_TIMEOUT) {
                try {
                    user = await models.User.findOne({
                        attributes: ['name', 'email', 'picture_small'],
                        where: {id: user_id},
                        include: [{model: models.Account, attributes: ['name']}],
                        logging: false
                    });
                    router.dbStatus = {ok: true};
                } catch (e) {
                    router.dbStatus = {ok: false, lastAttempt: new Date()};
                    console.error('WARNING! mysql query failed: ', e.toString());
                    offchain.serverBusy = true;
                }
            } else {
                offchain.serverBusy = true;
            }
            if (user) {
                let account = null;
                if (user.Accounts && user.Accounts.length > 0) {
                    account = user.Accounts[user.Accounts.length - 1].name;
                }
                offchain.user = {
                    id: user_id,
                    name: user.name,
                    email: user.email,
                    picture: user.picture_small,
                    account
                }
            }
        }
        if (ctx.session.arec) {
            const account_recovery_record = await models.AccountRecoveryRequest.findOne({
                attributes: ['id', 'account_name', 'status', 'provider'],
                where: {id: ctx.session.arec, status: 'confirmed'}
            });
            if (account_recovery_record) {
                offchain.recover_account = account_recovery_record.account_name;
            }
        }
        const { body, title, statusCode, meta } = await universalRender({location: ctx.request.url, store, offchain});

        // Assets name are found into `webpack-stats`
        const assets = require('./webpack-stats.json');

        // Don't cache assets name on dev
        if (process.env.NODE_ENV === 'development') {
            delete require.cache[require.resolve('./webpack-stats.json')];
        }

        const props = {body, assets, title, meta};
        ctx.status = statusCode;
        ctx.body = '<!DOCTYPE html>' + renderToString(<ServerHTML { ...props } />);
    } catch (err) {
        // Render 500 error page from server
        const { error, redirect } = err;
        if (error) throw error;

        // Handle component `onEnter` transition
        if (redirect) {
            const { pathname, search } = redirect;
            ctx.redirect(pathname + search);
        }
        else if (redirect) {
            const { pathname, sitemap } = redirect;
            ctx.redirect(pathname + sitemap.xml);
        }

        throw err;
    }
}

router.dbStatus = {ok: true};
module.exports = router;
