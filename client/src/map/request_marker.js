import React from 'react';
import { Marker } from "react-google-maps";
import RequestMarkerModal from './request_marker_modal';

class RequestMarker extends React.Component {
    state = {
        open: false
      };
      
    handleClickOpen = () => {
        this.setState({ 
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return(
            <Marker
                position={this.props.location}
                onClick={this.handleClickOpen}
                icon={this.props.request.request_category_id === 1 ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
            >
                <RequestMarkerModal open={this.state.open} close={this.handleClose} request={this.props.request} fetchRequests={this.props.fetchRequests} />
            </Marker>
        )
    }
}

export default RequestMarker;