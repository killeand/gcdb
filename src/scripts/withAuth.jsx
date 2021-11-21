import React, { Component } from 'react';
import { Redirect } from 'react-router';
import _ from 'lodash';
import UserContext from '../components/UserContext';

export default function withAuth(newProps, permission) {
    return (AuthedPage) => {
        return class AuthedComponent extends Component {
            static contextType = UserContext;

            render() {
                let Authorized = 0;
                if (this.context.user) {
                    if (!permission) {
                        Authorized = 1;
                    }
                    else if ((this.context.user.Perms & permission) == permission) {
                        Authorized = 1;
                    }
                }
                else {
                    Authorized = -1;
                }

                switch (Authorized) {
                    case -1: return (<Redirect to={{pathname:"/login", state:{returnpath:this.props.location.pathname+this.props.location.search}}} />);
                    case 0: return (<p>You do not have permission to view this resource</p>);
                    case 1: return (<AuthedPage {...newProps} />);                
                }
            }
        }
    }
};