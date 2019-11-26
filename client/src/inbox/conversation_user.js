import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { ListItem, Avatar, ListItemText, Paper } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

class ConversationUser extends React.Component {
    state = {
        userName: '',
        messages: null
    };

    componentDidMount() {
        this.fetchUserNames(this.props.conversation.id)
    }

    fetchUserNames = (id) => {
        const url = `conversations/${id}/users`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
            this.setConversationUser(Cookies.getJSON('currentUser').user_id, data)
        })
        .catch(error => console.error('Error: ', error))
    }

    setConversationUser = (currentUserId, arr) => {
        let user = arr.find(i => i.id !== currentUserId)

        this.setState({
            userName: `${user.first_name} ${user.last_name}`
        })
    }

    handleClick = () => {
        this.props.setConversationUser(this.state.userName)
        this.props.click(this.props.conversation.id)    
    }


    render() {
        return(
            <Fragment>
                <Paper elevation={2} id='list-item-paper' style={{marginBottom: '10px'}}>
                    <ListItem 
                    alignItems="flex-start" 
                    key={this.props.conversation.id} 
                    onClick={this.handleClick}
                    className={this.props.active === this.props.conversation.id ? "active-conversation" : ""}
                    >
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                        <ListItemText
                            primary={this.state.userName}
                            style={{overflow:'scroll'}}
                            //secondary={
                            //    <React.Fragment>
                            //    {"Potential message snippet" }
                            //    </React.Fragment>
                            //}
                            className={this.props.active === this.props.conversation.id ? "active-conversation-text" : ""}
                        />
                    </ListItem>
                </Paper>
            </Fragment>
        )
    }
}

export default ConversationUser;