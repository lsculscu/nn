import React from 'react';

class Contact extends React.Component {
    render() {
        return (
        <div className="contactform back">
            <div className="row">
                <div className="column">                    
                    <h2 className="center3 above">Contact Us</h2>
                    <p className="center3">
                        For any enquiries please contact us at steemcrawl@mail.com                        
                    </p>
                </div>                
            </div>
            <div className="row">
                <div className="column"> 
                    <form action="mailto:steemcrawl@mail.com" method="GET">
                        <div className="setter">
                            <label htmlFor="name">Name:</label>
                            <input className="input1" type="text" id="name" name="user_name" />
                        </div>
                        <div className="setter">
                            <label htmlFor="mail">E-mail:</label>
                            <input className="input1" type="email" id="mail" name="user_email" />
                        </div>
                        <div className="setter">
                            <label htmlFor="msg">Message:</label>
                            <textarea className="input2" id="msg" name="user_message"></textarea>
                        </div>

                        <div className="button blue1">
                            <button type="submit">Send your message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

module.exports = {
    path: 'contact.html',
    component: Contact
};