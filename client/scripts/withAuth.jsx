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
                        <Loading />
                    );
                }

                if (this.state.Data == true) {
                    return (
                        <AuthedPage {...newProps} />
                    );
                }
                else {
                    return (
                        <Redirect to={{pathname:"/login", state:{returnpath:this.props.location.pathname+this.props.location.search}}} />
                    );
                }
            }
        }
    }
};