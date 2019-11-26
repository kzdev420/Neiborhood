import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar';
import Footer from './footer/footer';
import './requests_layout.css'
import RequestsMapContainer from './requests_map_container'
import { connect } from 'react-redux';
import { setRequests } from '../redux/actions';

export class RequestsPage extends React.Component {
    state={
        userLocation: {
            lat: 51.515499,
            lng: -0.1419
        }
    }
    componentDidMount() {
        this.fetchUserLocation();
        this.fetchRequests();
        //console.log(Cookies.get('Authorization'))
    }

    fetchRequests = () => {
        const url = '/requests';
         
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
            this.props.setRequests(data)
        })
        .catch(error => console.error('Error:', error)) 
    }

    fetchUserLocation = () => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
        
        fetch(url, {
            method: 'POST',
            mode: 'cors'
        }).then(response => {
            //console.log(response)
            this.setState({
                response: response
            })
            if(this.state.response.status === 200) {
                return response.json();
            }
        }).then(data => {
            if (this.state.response.status === 200) {
                //console.log(data)
                this.setState({
                    userLocation: {
                        lat: data.location.lat,
                        lng: data.location.lng
                    }
                })
            } 
        })
        .catch(error => console.error('Error:', error)) 
    }
    

    render() {
        return(
            <Fragment>
                <Navbar title='Requests' history={this.props.history} />
                <Grid container id="map-container">
                    <RequestsMapContainer userLocation={this.state.userLocation} requests={this.props.requests} fetchRequests={this.fetchRequests}/>
                </Grid>
                <Footer fetchRequests={this.fetchRequests} requests={this.props.requests} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      requests: state.requests
    }
  }

export default connect(
    mapStateToProps, 
    { setRequests }
)(RequestsPage);