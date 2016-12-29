import React from 'react';
import {connect} from 'react-redux';
import AppPropTypes from 'app/utils/AppPropTypes';
import Header from 'app/components/modules/Header';
import LpFooter from 'app/components/modules/lp/LpFooter';
import user from 'app/redux/User';
import g from 'app/redux/GlobalReducer';
import { Link } from 'react-router';
import TopRightMenu from 'app/components/modules/TopRightMenu';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import SidePanel from 'app/components/modules/SidePanel';
import CloseButton from 'react-foundation-components/lib/global/close-button';
import Dialogs from 'app/components/modules/Dialogs';
import Modals from 'app/components/modules/Modals';
import Icon from 'app/components/elements/Icon';
import {key_utils} from 'shared/ecc'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: null, showCallout: true, showBanner: true, expandCallout: false};
        this.toggleOffCanvasMenu = this.toggleOffCanvasMenu.bind(this);
        // this.shouldComponentUpdate = shouldComponentUpdate(this, 'App')
    }

    componentWillMount() {
        if (process.env.BROWSER) localStorage.removeItem('autopost') // July 14 '16 compromise, renamed to autopost2
        this.props.loginUser();
    }

    componentDidMount() {
        require('fastclick').attach(document.body);
        // setTimeout(() => this.setState({showCallout: false}), 15000);
    }

    componentDidUpdate(nextProps) {
        // setTimeout(() => this.setState({showCallout: false}), 15000);
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({showBanner: false, showCallout: false})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const p = this.props;
        const n = nextProps;
        return p.location !== n.location || 
                  p.loading !== n.loading ||
                  p.visitor !== n.visitor ||
                  p.flash !== n.flash || this.state !== nextState;
    }

    toggleOffCanvasMenu(e) {
        e.preventDefault();
        // this.setState({open: this.state.open ? null : 'left'});
        this.refs.side_panel.show();
    }

    handleClose = () => this.setState({open: null});

    navigate = (e) => {
        const a = e.target.nodeName.toLowerCase() === 'a' ? e.target : e.target.parentNode;
        // this.setState({open: null});
        if (a.host !== window.location.host) return;
        e.preventDefault();
        browserHistory.push(a.pathname + a.search + a.hash);
    };

    onEntropyEvent(e) {
        if(e.type === 'mousemove')
            key_utils.addEntropy(e.pageX, e.pageY, e.screenX, e.screenY)
        else
            console.log('onEntropyEvent Unknown', e.type, e)
    }

    render() {
        const {location, params, children, loading, flash, showSignUp, new_visitor,
            depositSteem} = this.props;
        const lp = false; //location.pathname === '/';
        const params_keys = Object.keys(params);
        const ip = location.pathname === '/' || (params_keys.length === 2 && params_keys[0] === 'order' && params_keys[1] === 'category');
        const alert = this.props.error || flash.get('alert');
        const warning = flash.get('warning');
        const success = flash.get('success');
        let callout = null;
        if (this.state.showCallout && (alert || warning || success)) {
            callout = <div className="App__announcement row">
                <div className="column">
                    <div className={classNames('callout', {alert}, {warning}, {success})}>
                        <CloseButton onClick={() => this.setState({showCallout: false})} />
                        <p>{alert || warning || success}</p>
                    </div>
                </div>
            </div>;
        }
        else if (false && ip && this.state.showCallout) {
            callout = <div className="App__announcement row">
                <div className="column">
                    <div className={classNames('callout success', {alert}, {warning}, {success})}>
                        <CloseButton onClick={() => this.setState({showCallout: false})} />                        
                    </div>
                </div>
            </div>
        }
        if ($STM_Config.read_only_mode && this.state.showCallout) {
            callout = <div className="App__announcement row">
                <div className="column">
                    <div className={classNames('callout warning', {alert}, {warning}, {success})}>
                        <CloseButton onClick={() => this.setState({showCallout: false})} />
                        <p>Due to server maintenance we are running in read only mode.  We are sorry for the inconvenience.</p>
                    </div>
                </div>
            </div>;
        }

        let welcome_screen = null;
        if (new_visitor && this.state.showBanner) {
            
        }

        return <div className={'App' + (lp ? ' LP' : '') + (ip ? ' index-page' : '')} onMouseMove={this.onEntropyEvent}>
           
            <Header toggleOffCanvasMenu={this.toggleOffCanvasMenu} menuOpen={this.state.open} />
            <div className="row expanded spider">
                <div className="half"><img className="left1" src={require('app/assets/images/left.png')} /></div>
                <div className="half"><img className="right1" src={require('app/assets/images/right.png')} /></div>
            </div>
            <div className="App__content">
                {welcome_screen}
                {callout}
                {children}
                {lp ? <LpFooter /> : null}
            </div>
            <Dialogs />
            <Modals />
        </div>;
    }
}

App.propTypes = {
    error: React.PropTypes.string,
    children: AppPropTypes.Children,
    location: React.PropTypes.object,
    loading: React.PropTypes.bool,
    loginUser: React.PropTypes.func.isRequired,
    depositSteem: React.PropTypes.func.isRequired,
};

export default connect(
    state => {
        return {
            error: state.app.get('error'),
            flash: state.offchain.get('flash'),
            loading: state.app.get('loading'),
            new_visitor: !state.user.get('current') &&
                !state.offchain.get('user') &&
                !state.offchain.get('account') &&
                state.offchain.get('new_visit')
        };
    },
    dispatch => ({
        loginUser: () =>
            dispatch(user.actions.usernamePasswordLogin()),
        showSignUp: e => {
            if (e) e.preventDefault();
            dispatch(user.actions.showSignUp());
        },
        depositSteem: () => {
            dispatch(g.actions.showDialog({name: 'blocktrades_deposit', params: {outputCoinType: 'VESTS'}}));
        },
    })
)(App);
