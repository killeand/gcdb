import React, { Component } from 'react';
import { Redirect } from 'react-router';
import _ from 'lodash';

import Loading from '../components/Loading';

export default function withAuth(newProps, permission) {
    return (AuthedPage) => {
        return class AuthedComponent extends Component {
            constructor(props) {
                super(props);

                fetch("/data/v1/users/check", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((response, error) => {
                    return response.json();
                }).then((data, error) => {
                    let allowed = 0;

                    if (_.has(data, "error")) {
                        allowed = 2;
                    }
                    else if (permission == undefined || permission == null)
                        allowed = 1;
                    else
                        if (_.has(data, "Perms"))
                            if ((data.Perms & permission) == permission)
                                allowed = 1;
                            else
                                allowed = 3;
                        else
                            allowed = 2;

                    this.setState({Loaded:true, Permit:allowed});
                })
            }
            
            state = {
                Loaded: false,
                Permit: null
            }

            render() {
                if (!this.state.Loaded) {
                    return (
                        <Loading />
                    );
                }

                if (this.state.Permit == 1) {
                    return (
                        <AuthedPage {...newProps} />
                    );
                }
                else if (this.state.Permit == 2) {
                    return (
                        <Redirect to={{pathname:"/login", state:{returnpath:this.props.location.pathname+this.props.location.search}}} />
                    );
                }
                else if (this.state.Permit == 3) {
                    return (
                        <p>You do not have permission to view this resource</p>
                    );
                }
            }
        }
    }
};