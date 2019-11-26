import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import RequestMarker from './request_marker';

const RequestsMap = withScriptjs(withGoogleMap((props) =>{

  let unFulfilledRequests = props.requests.filter(request => request.fulfilled === false);

    const markers = unFulfilledRequests.map(request => 
      <RequestMarker 
          key={request.id} request={request} fetchRequests={props.fetchRequests} location={{lat: request.latitude, lng: request.longitude}}
        />
    )

    let location = {
      lat: props.userLocation.lat,
      lng: props.userLocation.lng
    }

    return (
        <GoogleMap
          defaultZoom={14}
          center={ { lat: location.lat, lng: location.lng } }
          >
            {markers}
        </GoogleMap>
      );
    }
))

export default RequestsMap;