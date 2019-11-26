import React from "react";
import RequestsMap from './requests_map';

class RequestsMapContainer extends React.Component {
    
    render() {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        
        return(
            
            <RequestsMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}   
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                requests={this.props.requests}
                userLocation={this.props.userLocation}
                fetchRequests={this.props.fetchRequests}
            />
        );
    }
}

export default RequestsMapContainer;
