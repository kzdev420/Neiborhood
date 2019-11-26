import React from 'react';
import RequestModal from './request_modal';
import { AppBar, Toolbar, Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './footer.css';

class Footer extends React.Component {
    state = {
        open: false,
        unFulfilledRequests: null
    };

    componentDidMount(){
        this.interval = setInterval(() => this.checkRequestsNumber(), 5000)
        //console.log(this.state)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    checkRequestsNumber = () => {
        let unFulfilledRequests = this.props.requests.filter(request => request.fulfilled === false).length;
        this.setState({
            unFulfilledRequests: unFulfilledRequests
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
        

    render() {
        let unFulfilledRequestsLength = this.props.requests.filter(request => request.fulfilled === false).length;

        return(
            <AppBar position="fixed" color="primary" style={{top: 'auto', bottom: 0}} >
                <Toolbar style={{ alignItems: 'center', justifyContent: 'space-between'}} id="map-footer">
                    <Fab color="secondary" aria-label="Add" id="fab-add-button" onClick={this.handleClickOpen}>
                        <AddIcon/>
                    </Fab>
                    <RequestModal open={this.state.open} close={this.handleClose} fetchRequests={this.props.fetchRequests} />
                    <Typography variant="overline" color="inherit">
                        Total requests: {this.state.unFulfilledRequests ? this.state.unFulfilledRequests : unFulfilledRequestsLength}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}


export default Footer;