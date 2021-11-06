import React, { Component } from 'react';
import { Navigate, useLocation, useMatch, useParams } from 'react-router-dom';
import _ from 'lodash';

export default function withAuth(AuthedPage, newProps, permission) {
    return class AuthedComponent extends Component {
        constructor(props) {
            super(props);

            console.log(props, newProps, permission);

            fetch("/data/v1/users/auth", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            }).then((response, error) => {
                return response.json();
            }).then((data, error) => {
                this.setState({Loaded:true, Data:((data.Perms & permission) == permission)});
            })
        }
        
        state = {
            Loaded: false,
            Data: null
        }

        render() {
            if (!this.state.Loaded) {
                return (
                    <p>Loading...</p>
                );
            }

            if (this.state.Data == true) {
                return (
                    <AuthedPage {...newProps} />
                );
            }
            else {
                return (
                    <Navigate to="/login" replace={true} />
                );
            }
        }
    }
};

export function withRouter(Component) {
    return (props) => { return <Component location={useLocation()} params={useParams()} /> }
}

export function withAuth2(newProps) {
    return (AuthedPage) => {
        return withRouter(class AuthedComponent extends Component {
            render() {
                console.log(this.props, newProps);
                return (<AuthedPage {...this.props} {...newProps} />);
            }
        });
    }
}