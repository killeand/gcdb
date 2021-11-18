import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import Group from '../components/Group';
import Alert from '../components/Alert';
import Button from '../components/Button';

export default class Login extends Component {
    state = {
        ErrorMsg: null,
        LoginSuccess: false
    }

    formInputs = {
        Username: React.createRef(),
        Password: React.createRef()
    }

    HandleLogin(e) {
        e.preventDefault();

        console.log(this.formInputs);
        
        fetch(":4000/data/v1/users/auth", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                Email:findDOMNode(this.formInputs.Username.current).value,
                Password:findDOMNode(this.formInputs.Password.current).value
            })
        }).then((response, error) => {
            if (response)
                return response.json();
        }).then((data, error) => {
            if (data) {
                this.setState({LoginSuccess:true});
                this.props.onLogin();
            }
        });
    }

    RenderAlerts() {
        if (this.state.ErrorMsg) {
            return (
                <>
                    <Alert type="error">{this.state.ErrorMsg}</Alert>
                </>
            );
        }
    }

    render() {
        if (this.state.LoginSuccess) {
            if (_.has(this.props, "location.state.returnpath"))
                return (<Redirect to={this.props.location.state.returnpath} />);
            else
                return (<Redirect to="/" />);
        }

        return (
            <>
                {this.RenderAlerts()}
                <form className="flex flex-col space-y-2 mx-auto w-full md:w-1/2 p-5 border border-black bg-gray-200 md:rounded-md" onSubmit={this.HandleLogin.bind(this)}>
                    <Group>
                        <Group.Pre>
                            <Group.Label htmlFor="username">Username:</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Input id="username" type="text" ref={this.formInputs.Username} />
                        </Group.Post>
                    </Group>
                    <Group>
                        <Group.Pre>
                            <Group.Label htmlFor="password">Password:</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Input id="password" type="password" ref={this.formInputs.Password} />
                        </Group.Post>
                    </Group>
                    <div className="text-center">
                        <Button color="blue" className="border border-black rounded-xl" onClick={this.HandleLogin.bind(this)}>Login</Button>
                    </div>
                </form>
            </>
        );
    }
}