import React, { Component, PropTypes } from 'react';

export default class GoogleAd extends Component {
  static propTypes = {
    client: PropTypes.string,
    slot: PropTypes.string,
    format: PropTypes.string
    //wrapperDivStyle: PropTypes.object,
    //google_ad_client: PropTypes.string
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
         function loadScript() {
         var script= document.createElement('script');
         script.type= 'text/javascript';
         script.src= '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
         script.async = true;
         document.body.appendChild(script);
    }
    loadScript();
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    }


  // This code is ran when the component mounts
  
  // an outer div for styling purposes
  // changed class to ClassName
  // changed style from string to an object

  render() {
    return (
        <div style={this.props.wrapperDivStyle} >
        <ins className="adsbygoogle"  
          style={{'display': 'block'}}
          data-ad-client={this.props.client}
          data-ad-slot={this.props.slot}
          data-ad-format={this.props.format}>        
          
        </ins>
      </div>
    );
  }
}

