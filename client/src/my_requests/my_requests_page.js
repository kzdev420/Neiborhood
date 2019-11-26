import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar';
import { connect } from 'react-redux';
import RequestCards from './request_cards';
import { setRequests } from '../redux/actions';
import './my_requests.css'

export class MyRequestsPage extends React.Component {
    componentDidMount() {
        this.fetchRequests();
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

    render() {
        return(
            <Fragment>
                <Navbar title='My Requests' history={this.props.history}/>
                <RequestCards fetchRequests={this.fetchRequests} requests={this.props.requests}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

export default connect(
    mapStateToProps, 
    { setRequests }
)(MyRequestsPage);