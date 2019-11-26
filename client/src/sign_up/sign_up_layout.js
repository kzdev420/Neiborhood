import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import SignUpForm from './sign_up_form';
import './sign_up_layout.css';

const SignUpPage = (props) => {
    return(
        <Grid container alignContent={'center'} justify={'center'} className="main-container" id="sign-up-container" style={{minHeight: '100vh'}}> 
            <Grid container alignContent={'center'} justify={'center'} className="overlay" id="sign-up-container" style={{minHeight: '100vh', paddingBottom: '10px', paddingTop: '10px'}}>  
                <Grid item sm={8} xs={10}>
                    <Paper id='sign-up-form-paper'>
                    <Typography variant="h5" gutterBottom align="center">
                        Please fill out this form and upload a picture of a valid ID
                    </Typography>
                        <SignUpForm history={props.history}/>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SignUpPage;