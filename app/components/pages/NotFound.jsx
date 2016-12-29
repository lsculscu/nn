import React from 'react';
import SvgImage from 'app/components/elements/SvgImage';

class NotFound extends React.Component {
    render() {
        return (
            <div className="NotFound float-center">
                <a href="/"><img src={require('app/assets/images/400.png')} /></a>
                Sorry this page is not found.
            </div>
        );
    }
}

module.exports = {
    path: '*',
    component: NotFound
};
