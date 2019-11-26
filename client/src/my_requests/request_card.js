import React from 'react';
import Cookies from 'js-cookie';
import { Grid, Typography, Card, CardContent, 
    CardActions, Button, CardHeader } from '@material-ui/core';

class RequestCard extends React.Component {
    handleFulfilled = () => {
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
        })
        .catch(error => console.error('Error:', error)) 
    }

    handleRelist = () => {
        const url = `requests/${this.props.request.id}`;
        const data = {
            fulfilled: false
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
        })
        .catch(error => console.error('Error:', error))
    }


    render() {
        return(
            <Grid item sm={6} xs={12}>
                <Card raised className="request-card">
                    <CardHeader 
                    title={this.props.request.created_at.slice(0,10).split("-").reverse().join("-")}
                    subheader={this.props.request.request_category_id === 1 ? "One-time task" : "Material need"}
                    className={this.props.request.request_category_id === 1 ? "request-card-title one-time-card" : "request-card-title material-need-card" }
                    style={this.props.request.fulfilled ? {backgroundColor: "#43a047"} : null}
                    />   
                    <CardContent id="request-card-content">
                        {/*<Typography  variant={'overline'} color="textSecondary" gutterBottom>
                            {this.props.request.request_category_id === 1 ? "Request type: One-time task" : " Request Type: Material need"}
                        </Typography>*/}
                        <br></br>
                        <Typography variant='subtitle2' className="description-body">
                        {this.props.request.description}
                        </Typography>
                        <br />
                        {/*<Typography  color="textSecondary">
                        {this.props.request.id}
                        </Typography>*/}
                        <br></br>
                        <Typography color="textSecondary" variant="body1">
                        Status: {this.props.request.fulfilled ? "Fulfilled" : "Unfulfilled"}
                        <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                        variant="contained" 
                        size="small" 
                        color="primary" 
                        onClick={this.handleRelist}
                        disabled={this.props.request.fulfilled ? false : true}
                        >
                        Repost
                        </Button>
                        <Button 
                        variant="contained" 
                        size="small" 
                        color="secondary" 
                        onClick={this.handleFulfilled}
                        disabled={this.props.request.fulfilled ? true : false}
                        >
                        Fulfilled
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default RequestCard;