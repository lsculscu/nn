// polyfill webpack require.ensure
//if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import App from 'app/components/App';
import PostsIndex from 'app/components/pages/PostsIndex';
import resolveRoute from './ResolveRoute';

export default {
    path: '/',
    component: App,
    getChildRoutes(nextState, cb) {
        const route = resolveRoute(nextState.location.pathname);
        if (route.page === 'About') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/About')]);
            //});
        } else if (route.page === 'Privacy') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Privacy')]);
            //});
        } else if (route.page === 'Support') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Support')]);
            //});
        } else if (route.page === 'XSSTest' && process.env.NODE_ENV === 'development') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/XSS')]);
            //});
        } else if (route.page === 'Tags') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/TagsIndex')]);
            //});
        } else if (route.page === 'Tos') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Tos')]);
            //});
        } else if (route.page === 'WaitingList') {
            //require.ensure([], (require) => {
            cb(null, [require('app/components/pages/WaitingList')]);
            //});
        } else if (route.page === 'Witnesses') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Witnesses')]);
            //});
        } else if (route.page === 'SubmitPost') {
            //require.ensure([], (require) => {
            if (process.env.BROWSER)
                cb(null, [require('app/components/pages/SubmitPost')]);
            else
                cb(null, [require('app/components/pages/SubmitPostServerRender')]);
        } else if (route.page === 'UserProfile') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/UserProfile')]);
            //});
        }

        else if (route.page === 'Contact') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Contact')]);
            //});
        }
        else if (route.page === 'Terms') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Terms')]);
            //});
        }
         else if (route.page === 'Market') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Market')]);
            //});
        } else if (route.page === 'Post') {
            //require.ensure([], (require) => {
                cb(null, [require('app/components/pages/Post')]);
            //});
        } else if (route.page === 'PostsIndex') {
            //require.ensure([], (require) => {
                //cb(null, [require('app/components/pages/PostsIndex')]);
                cb(null, [PostsIndex]);
            //});
        } else {
            //require.ensure([], (require) => {
                cb(process.env.BROWSER ? null : Error(404), [require('app/components/pages/NotFound')]);
            //});
        }
    },
    indexRoute: {
        component: PostsIndex.component
    }
};