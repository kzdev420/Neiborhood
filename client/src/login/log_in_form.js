import React from 'react';
import { TextField, FormControl, InputLabel, InputAdornment, IconButton, Input,
        Fab } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import NavigationIcon from '@material-ui/icons/Navigation';
import Cookies from 'js-cookie';

class LogInForm extends React.Component {
    state = {
        email: '',
        password: '',
        showPassword: false,
        response: {},
        error: false,
        errorText: null
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let url = '/signin'
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({
                response: response
            })
            //console.log(response)
            Cookies.set('Authorization', response.headers.get('Authorization'), { expires: 1 });

            return response.json();
        }).then(data => {
            Cookies.set('currentUser', {
                user_id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email         
            }, { expires: 1 })
            //console.log(Cookies.getJSON('currentUser'))
            
            this.checkResponseStatus(this.state.response, data);
        })
        .catch(error => console.error('Error:', error)) 
    }

    checkResponseStatus = (response, data) => {
        const { from } = this.props.location || {from: {pathname: '/'}} 
  
        if (response.status === 200) {
            this.props.history.push(from)
        } else if (response.status === 401) {
            this.setState({
                error: true,
                errorText: data.error
            })
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                        required 
                        error={this.state.error}
                        style={{width: '100%'}}
                    />
                <FormControl style={{width: '100%'}} required error={this.state.error}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="login-error-message" style={this.state.errorText ? {display: 'block'} : {display: 'none'}}>{this.state.errorText}</div>
                <Fab 
                id="login-button"
                variant="extended" 
                aria-label="Log in" 
                type="submit"
                color="secondary" 
                onClick={this.handleSubmit}
                style={{marginTop: "15px", marginBottom: "10px", width: "100%"}}
                >
                    <NavigationIcon />
                    Log in
                </Fab>
            </form>
        )
    }
}

export default LogInForm;