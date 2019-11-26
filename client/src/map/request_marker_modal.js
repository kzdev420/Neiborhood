import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Typography, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class RequestMarkerModal extends React.Component {
    state = {
        checked: true,
        requestUserName: null,
        repliesNumber: 0, 
        open: false,
        validateForm: false,
        currentUserResponded: false
      };

    componentDidMount() {
        this.fetchRequestUser(this.props.request.user_id)
        this.fetchRepliesNumber(this.props.request.id)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
      };

    handleCheckChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.message) { 
            this.submitReply();
            this.startConversation();
        } else {
            this.validateForm()
        }
    }

    fetchRequestUser = (user_id) => {
        const url = `/users/${user_id}`

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            this.setState({
                requestUserName: `${data.first_name} ${data.last_name}`
            })
        })
    }

    fetchRepliesNumber = (request_id) => {
        const url = `/requests/${request_id}/replies`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
            this.checkIfUserResponded(data)
            this.setState({
                repliesNumber: data.length
            })
        })
    }

    checkIfUserResponded = (data) => {
        for(let i=0; i<data.length; i++){
            if (data[i].volunteer_id === Cookies.getJSON('currentUser').user_id){
                this.setState({
                    currentUserResponded: true
                })
                return true
            }
        }
    }

    renderAlreadyRespondedMessage = () => {
        if(this.state.currentUserResponded) {
            return (
                <div className='already-responded-message' style={{fontWeight:'bold', color: '#43a047'}}> 
                    You have already responded to this request!
                    <br></br>
                </div>
                
            )
        }
    }

    submitReply = () => {
        const url = "/replies"
        const data = {
            request_id: this.props.request.id,
            volunteer_id: Cookies.getJSON('currentUser').user_id,
            active: this.state.checked,
            message_sent: true
        }


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            //console.log(response)
            this.checkRepliesNumber(this.props.request.id)
            this.fetchRepliesNumber(this.props.request.id)
            return response.json()
        }).then(data => {
            //console.log(data)
        })
        .catch(error => console.error('Error:', error))
    }

    checkRepliesNumber = (request_id) => {
        const url = `/requests/${request_id}/replies`

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            if(data.length % 5 === 0) {
                this.markAsFulfilled();
            } 
        })
    }

    markAsFulfilled = () => {
        const url = `requests/${this.props.request.id}`;
        const data = {
            fulfilled: true
        };

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            //console.log(response)
            this.props.fetchRequests();
            //return response.json()
        })//.then(data => {
            //console.log(data)
        //})
        .catch(error => console.error('Error:', error)) 
    }

    startConversation = () => {
        const url = '/conversations';
        const data = {
            user_id: Cookies.getJSON('currentUser').user_id,
            user_id_2: this.props.request.user_id
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            //console.log(response)
            return response.json()
        }).then(data => {
            //console.log(data)
            this.submitMessage(data.id)
        })
        .catch(error => console.error('Error:', error))
    }

    submitMessage = (conversationId) => {
        const url = `/conversations/${conversationId}/messages`;
        const data = {
            user_id: Cookies.getJSON('currentUser').user_id,
            conversation_id: conversationId,
            text: this.state.message
        }

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            },
            body: JSON.stringify(data)
        }).then(response => {
            //console.log(response)   
            if(response.status === 201) {
                this.props.close()
                this.setState({
                    open: true
                })
            }        
            return response.json()
        }).then(data => {
            //console.log(data)
        })
    }
    
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

      handleModalClose = () => {
        this.setState({
            validateForm: false
        })
        this.props.close()
    }

      validateForm = () => {
        this.setState({
            validateForm: true
        })
      }

      renderErrorMessage = () => {
        if (this.state.validateForm) {
            return (
                <div className='request-response-error-message' style={{fontWeight:'bold', color: '#f44336', marginTop: '5px'}}> 
                    Can't be blank
                </div>
            )
      }
    }

    render() {
        return(
            <Fragment>
            <Dialog
                    open={this.props.open}
                    onClose={this.handleModalClose}
                    aria-labelledby="form-dialog-title"
                    
                >
                    <DialogTitle 
                    className="form-dialog-title"
                    style={this.props.request.request_category_id === 1 ? {backgroundColor: "#8C9EFF"} : {backgroundColor: "#f6685e"}}
                    >
                        {this.state.requestUserName} 
                    </DialogTitle>
                    <DialogContent>
                        
                        <Typography variant="overline" gutterBottom>
                            Request type: {this.props.request.request_category_id === 1 ? "One-time task" : 'Material need'}
                        </Typography>
                        <br></br>
                        <Typography variant='subtitle1'>
                            {this.props.request.description}
                        </Typography>
                        
                        <br></br>
                        <Typography variant='subtitle2'>
                            Replies so far: {this.state.repliesNumber}
                        </Typography>
                        <br></br>
                        {this.renderAlreadyRespondedMessage()}
                        <form id="response-form" onSubmit={this.handleSubmit} noValidate>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="message"
                                label="Message"
                                fullWidth
                                multiline
                                rows="4"
                                onChange={this.handleChange('message')}
                                required
                                error={this.state.validateForm}
                                disabled={this.state.currentUserResponded}
                            />
                            {this.renderErrorMessage()}
                            {/*<FormControlLabel
                                control={
                                    <Switch
                                    checked={this.state.checked}
                                    onChange={this.handleCheckChange('checked')}
                                    value="checked"
                                    color="primary"
                                    />
                                }
                                label="Fulfill"
                            />*/}
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} color="primary">
                        Cancel
                        </Button>
                        <Button 
                        color="primary" 
                        type='submit' 
                        form="response-form"
                        disabled={Cookies.getJSON('currentUser').user_id === this.props.request.user_id || this.state.currentUserResponded === true ? true : false}
                        >
                        Fulfil
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    className="success-snackbar"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        <span id="message-id">
                            Message sent!
                        </span>
                    }
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </Fragment>     
        )
    }
}

export default RequestMarkerModal;