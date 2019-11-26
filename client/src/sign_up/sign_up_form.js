import React from 'react';
import Cookies from 'js-cookie';
import { TextField, Button, Fab, FormControl, InputLabel, 
        InputAdornment, IconButton, Input, Tooltip } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


class SignUpForm extends React.Component {
   state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    showPassword: false,
    password_confirmation: '',
    showPasswordConfirmation: false,
    response: {},
    errors: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
        image: null
    }
   }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowPasswordConfirmation = () => {
        this.setState(state => ({ showPasswordConfirmation: !state.showPasswordConfirmation }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("sign-up-form")

        const formData = new FormData(form)
        const url = '/signup'

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            //console.log(response)
            this.setState({
                response: response
            })
            /*
            if (response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            */
           if (response.status === 200) {
             Cookies.set('Authorization', response.headers.get('Authorization'), { expires: 1 });
             return response.json();
           } else {
               return response.json()
           }
        }).then(data => {
           // console.log(data)
           if(this.state.response.status === 200) {
                Cookies.set('currentUser', {
                    user_id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email         
                }, { expires: 1 })

                this.checkResponseStatus(this.state.response, data);
            } else {
                this.checkResponseStatus(this.state.response, data);
            }
        })
        .catch(error => console.error('Error:', error));    
    }

    checkResponseStatus = (response, data) => {
        if (response.status === 200) {
            this.props.history.push("/")
        } else if (response.status === 422) {
            this.setState({
                errors: data.errors
            })
        }
        //console.log(this.state.errors)
    }

    checkError = (field) => {
        if (this.state.errors[field]) {
            return true
        } else {
            return false
        }
    }
    
    renderErrorMessage = (field) => {
        if(this.state.errors[field]) {
            let formattedText = this.state.errors[field][0].charAt(0).toUpperCase() + this.state.errors[field][0].slice(1)

            return(
                <div className='signup-error-message' style={{fontWeight:'bold', color: '#f44336'}}> 
                    {formattedText}
                </div>
            )
        }
    }


    render() {
        return(
            <form id="sign-up-form" onSubmit={this.handleSubmit} noValidate>
                <TextField
                    label="First Name"
                    name="first_name"
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                    required
                    fullWidth
                    error={this.checkError('first_name')}
                />
                {this.renderErrorMessage('first_name')}
                <TextField
                    label="Last Name"
                    name="last_name"
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                    required
                    fullWidth
                    error={this.checkError('last_name')}
                />
                {this.renderErrorMessage('last_name')}
                <TextField
                    label="Email"
                    name="email"
                    onChange={this.handleChange('email')}
                    margin="normal"
                    required
                    fullWidth
                    error={this.checkError('email')}
                />
                {this.renderErrorMessage('email')}
                <FormControl style={{width: '100%', marginBottom: '8px'}} required>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        name='password'
                        error={this.checkError('password')}
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
                {this.renderErrorMessage('password')}
                <FormControl style={{width: '100%', marginBottom: '8px'}} required>
                    <InputLabel htmlFor="adornment-password-confirmation">Password Confirmation</InputLabel>
                    <Input
                        id="adornment-password-confirmation"
                        type={this.state.showPasswordConfirmation ? 'text' : 'password'}
                        value={this.state.password_confirmation}
                        onChange={this.handleChange('password_confirmation')}
                        name="password_confirmation"
                        error={this.checkError('password_confirmation')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPasswordConfirmation}
                            >
                            {this.state.showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                {this.renderErrorMessage('password_confirmation')}
                <Tooltip disableFocusListener disableTouchListener title=".jpg / .png / .pdf" placement="right">
                <label htmlFor="upload">
                    <Button component="span" color="primary">
                    Upload ID
                    </Button>
                </label>
                </Tooltip>
                <input
                    accept="image/png, image/jpeg, .pdf"
                    id="upload"
                    name="image"
                    type="file"
                    ref={this.fileInput}
                    required
                    style={{width: "100%"}}
                />
                {this.renderErrorMessage('image')}
                <Fab 
                variant="extended" 
                aria-label="Sign up" 
                color="secondary" 
                type="submit"
                style={{marginTop: "15px", marginBottom: "10px", width: "100%"}}
                >
                    Sign up
                </Fab>   
            </form>
        )
    }
}

export default SignUpForm;
