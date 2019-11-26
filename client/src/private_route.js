import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    const isAuthed = () => {
        if (Cookies.get('Authorization')) {
          return true
        } else {
            return false
        }
      }
      
    return (
        <Route 
            {...rest}
            render={((props) => isAuthed() === true ? 
            <Component {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>)}
        />
    )
}

export default PrivateRoute;