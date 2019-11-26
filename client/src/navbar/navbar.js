import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem  } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';

class Navbar extends React.Component {
    state = {
        anchorEl: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogOut = () => {
        this.handleClose();
        let url = "/logout";

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('Authorization')
            }
        }).then(response => {
            //console.log(response);
            //return response.json();
            Cookies.remove('Authorization', { path: '/' })
            Cookies.remove('currentUser', { path: '/' })
            this.checkResponseStatus(response);
        })
        .catch(error => console.error('Error:', error))
    }

    checkResponseStatus = (response) => {
        if (response.status === 204) {
            this.props.history.push("/login")
        }
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {this.props.title}
                    </Typography>
                    <div id='user-menu'>
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        id="menu-button"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        disableAutoFocusItem={true}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                            <Link to='/' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">Map</MenuItem></Link>
                            <Link to='/inbox' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">Inbox</MenuItem></Link>
                            <Link to='/myrequests' style={{textDecoration: 'none'}}><MenuItem onClick={this.handleClose} className="link">My requests</MenuItem></Link>
                            <MenuItem onClick={this.handleLogOut} style={{color: '#ff5252'}}>Log out</MenuItem>
                        </Menu>
                    </div>  
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;