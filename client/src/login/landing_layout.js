import React from 'react';
import { Link } from "react-router-dom";
import { Paper, Grid, Typography } from '@material-ui/core';
import LogInForm from './log_in_form';
import './landing_layout.css';
import Cookies from 'js-cookie';

class LandingPage extends React.Component {
    componentDidMount() {
        if(Cookies.get('Authorization')) {
            this.props.history.push('/')
        } 
    }

    render() {
        return(
            <Grid container alignItems={'center'} justify={'center'} className="main-container" style={{minHeight: '100vh'}}>
                <Grid container alignItems={'center'} justify={'center'} className="overlay" style={{minHeight: '100vh'}}>
                <Grid item sm={10} xs={10}>
                    <Paper elevation={4}>
                        <Grid container>
                            <Grid item sm={7} xs={12} id="main-header-container">                        
                                <Typography variant="h2">
                                    Local Aid
                                </Typography>
                                <Typography variant="subtitle1">
                                A platform facilitating acts of kindness in your community.
                                </Typography>                    
                            </Grid>
                            <Grid item sm={5} xs={12} id="login-form-container">                        
                                <Typography variant="h4" id="log-in-form-header">
                                    Welcome Back
                                </Typography>
                                <Typography variant="overline" id="log-in-form-subheader">
                                    Log in to continue
                                </Typography>
                                <LogInForm history={this.props.history} location={this.props.location.state}/> 
                                <Typography variant="subtitle2">
                                    Not a member? <Link to='/signup'>Sign up.</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                </Grid>
            </Grid>
        )
    }

}

export default LandingPage;
