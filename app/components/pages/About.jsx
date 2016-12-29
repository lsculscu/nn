import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="column back">                    
                    <h2 className="center3 above">About Us</h2>
                    <p className="above">
                        Steem Crawl is an alternative Steem blockchain client.

We simply facilitate the navigation of content published on Steem's blockchain.

In contrary to other Steem clients, we have decided to uniquely focus on displaying posts, removing comments, number of votes etcetera. The principal goal is to provide a bias-free reading experience. More specifically, so that authors will be judged on the quality of the content they publish alone, rather than on how users respond to it.

For a more profound understanding of Steem blockchain, <a href="https://steem.io/SteemWhitePaper.pdf">click on this link.</a>                        
                    </p>                    
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'about.html',
    component: About
};