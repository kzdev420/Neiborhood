import React from 'react';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import './messages.css'
import ReactDOM from 'react-dom';

class Messages extends React.Component {
    componentDidUpdate(prevProps) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight;
        //console.log(node)
      }

    render() {
        return(
            <Grid item id="messages-container-item" style={{height: "100%", overflowY:'scroll'}}>
                <Grid container item direction='column'>
                {this.props.messages.map(
                    message => 
                    <div key={message.id} className={message.user_id === Cookies.getJSON('currentUser').user_id ? "message my-message" : "message their-message"}>
                        {message.text}
                    </div>
                )}
                </Grid>
            </Grid>
        )
    }
}

export default Messages;