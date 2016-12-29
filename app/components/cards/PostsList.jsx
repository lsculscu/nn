import React, {PropTypes, Component} from 'react';
import PostSummary from 'app/components/cards/PostSummary';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import debounce from "lodash.debounce";


//google add-ES6
//import React, { Component } from 'react';
import GoogleAd from 'app/components/modules/google_ad';
//import {pinpost} from 'server/pinpost';
import {Apis} from 'shared/api_client/ApiInstances';



function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}




class PostsList extends React.Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        category: PropTypes.string,
        loadMore: PropTypes.func,
        emptyText: PropTypes.string,
        showSpam: PropTypes.bool,
    };

    static defaultProps = {
        showSpam: false,
    }

    constructor() {
        super();
        this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false,
        }
        this.scrollListener = this.scrollListener.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsList')
    }

    componentDidMount() {
        this.attachScrollListener();
        
    }
   /* componentWillMount() {
        const script = document.createElement("script");

        script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;

        document.body.appendChild(script);
    }*/

    componentWillUnmount() {
        this.detachScrollListener();
    }

    fetchIfNeeded() {
        this.scrollListener();
    }

    toggleNegativeReplies = () => {
        this.setState({
            showNegativeComments: !this.state.showNegativeComments
        });
    }

    scrollListener = () => console.log("hello")
    /*scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 10) {
            const {loadMore, posts, category} = this.props;
            if (loadMore && posts && posts.length > 0) loadMore(posts[posts.length - 1], category);
        }

        // Detect if we're in mobile mode (renders larger preview imgs)
        var mq = window.matchMedia('screen and (max-width: 39.9375em)');
        if(mq.matches) {
            this.setState({thumbSize: 'mobile'})
        } else {
            this.setState({thumbSize: 'desktop'})
        }
    }, 150)*/

    

        // Detect if we're in mobile mode (renders larger preview imgs)
        

    attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }

    

    render() {
        const {posts, loading, category, emptyText} = this.props;
        const {comments} = this.props
        const {thumbSize} = this.state
        
        const Loadnext = () => {
            var ul = document.getElementById("t1");
            ul.innerHTML = "";
            scroll(0,0);
            const {loadMore, posts, category} = this.props;
            if (loadMore && posts && posts.length > 0) loadMore(posts[posts.length - 1], category);
            console.log("check li items");
            console.log(ul.getElementsByTagName('li').length);
            console.log(ul.getElementsByTagName('li').length == 0);
            console.log(document.readyState === 'complete');
            setTimeout(function() {
            if (ul.getElementsByTagName('li').length == 0) {
                //ul.innerHTML = <li className="Noitem">There is no more items to show</li>
                var ul1 = document.getElementById("t1");
                var li1 = document.createElement("li");
                li1.appendChild(document.createTextNode("Sorry, there are no more posts to show"));
                li1.setAttribute("id", "noitem"); // added line
                ul1.appendChild(li1);
            }            
            }, 15000);
            
        }  

        const goBack = () => {
            window.history.back();
        }  
        
        if (!loading && !posts.length) {
            return <div>{emptyText}</div>;
        }

       const renderSummary = items => items.map(({item, ignore, netVoteSign, authorRepLog10}) => <li key={item}>
            <PostSummary post={item} currentCategory={category} thumbSize={thumbSize}
                ignore={ignore} netVoteSign={netVoteSign} authorRepLog10={authorRepLog10} />
        </li>)

        const style = {
            marginTop: '15px',
            marginBottom: '20px'

        };

        return (
            <div id="posts_list" className="PostsList">
                <div><GoogleAd 
                  client="ca-pub-3889455597512403" 
                  slot="1808561774" 
                  format="auto" 
                  wrapperDivStyle={style}
                /></div>  
                
                <ul className="PostsList__summaries hfeed" id="t1" itemScope itemType="http://schema.org/blogPosts">
                    
                    {renderSummary(comments)}
                </ul>                
                {loading && <center><LoadingIndicator type="circle" /></center>}
                  <div className="button hollow text-center slim" onClick={Loadnext}>Next</div>
                  <div className="button hollow text-center slim slim1" onClick={goBack}>Back</div>
                  <div><GoogleAd 
                  client="ca-pub-3889455597512403" 
                  slot="1808561774" 
                  format="auto" 
                  wrapperDivStyle={style}
                /></div>  
            </div>
        );
    }

}

import {List} from 'immutable'
import {connect} from 'react-redux'

export default connect(
    (state, props) => {
        const {posts, showSpam} = props;
        const comments = []
        posts.forEach(item => {
            const content = state.global.get('content').get(item);
            if(!content) {
                console.error('PostsList --> Missing content key', content)
                return
            }
        
            
            // let total_payout = 0;
            const current = state.user.get('current')
            const username = current ? current.get('username') : null
            const key = ['follow', 'get_following', username, 'result', content.get('author')]
            const ignore = username ? state.global.getIn(key, List()).contains('ignore') : false
            const {hide, netVoteSign, authorRepLog10} = content.get('stats').toJS()
            
            if(!(ignore || hide) || showSpam) // rephide
                comments.push({item, ignore, netVoteSign, authorRepLog10})
            
            
        })
        return {...props, comments};
    },
)(PostsList)
