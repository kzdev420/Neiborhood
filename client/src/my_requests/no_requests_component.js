import React from 'react';
import { Grid, Typography, Card, CardContent, 
    CardActions, Button, CardHeader } from '@material-ui/core';
import { Link } from "react-router-dom";

const NoRequests = (props) => {
    return (
        <Grid item container alignContent={'center'} justify={'center'} xs={12} className="main-container">
            <Grid item sm={8} xs={10} >
                <Card id="no-requests-paper" >
                    <CardHeader 
                        title="No Requests"
                        style={{textAlign: 'center'}}
                    />
                    <CardContent>
                        <Typography variant='subtitle1' className="description-body" align="center">
                            Please go to the map page to add a new request.
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center'}}>
                    <Link to='/' style={{textDecoration: 'none'}}>
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="secondary" 
                            onClick={null}
                            style={{textDecoration: 'none'}}
                        >
                            Add request
                        </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default NoRequests;