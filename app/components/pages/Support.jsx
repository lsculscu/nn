import React from 'react';

class Support extends React.Component {
    render() {
        return (
            <div className="row">
                <div>
                    <h2>Steem Crawl Support</h2>
                    <p>
                        Please email your questions to <a href="mailto:steemcrawl@mail.com">steemcrawl@mail.com</a>.
                    </p>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'support.html',
    component: Support
};
