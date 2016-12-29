import React, { Component } from 'react';
import SvgImage from 'app/components/elements/SvgImage';

class ServerError extends Component {

    render() {
        return (
            <div className="NotFound float-center" style={{width: '640px', textAlign: 'center'}}>
                <a href="/"><img src={require('app/assets/images/500.png')} /></a>
                <h1>Something went wrong.</h1>
                It's not you, it's us.
            </div>
        );
    }

}

export default ServerError;
