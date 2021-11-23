import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import $ from '../scripts/GCDBAPI';
import UserContext from '../components/UserContext';

import Group from '../components/Group';
import Alert from '../components/Alert';
import Button from '../components/Button';

export default class Login extends Component {
    static contextType = UserContext;

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

        let username = findDOMNode(this.formInputs.Username).value;
        let password = findDOMNode(this.formInputs.Password).value;

        if (username == "" || password == "") {
            this.setState({ErrorMsg: "Values must not be empty..."});
            return;
        }
        
        $.Post($.Path.Users.Auth, null, {
            Email:findDOMNode(this.formInputs.Username).value,
            Password:findDOMNode(this.formInputs.Password).value
        })
        .then((response, error) => {
            if (error)
                this.setState({ErrorMsg:"Authentication server error"});
            else if (response)
                if (response.status == "200")
                    return response.json();
                else
                    this.setState({ErrorMsg:"Authentication server error"});
        })
        .then((data, error) => {
            if (_.has(data, "success")) {
                this.setState({LoginSuccess:true});
                this.context.startCheck();
            }
            else if (_.has(data, "error"))
                this.setState({ErrorMsg:data.error});
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
        if (this.state.LoginSuccess || this.context.user) {
            if (_.has(this.props, "location.state.returnpath")) {
                return (<Redirect to={this.props.location.state.returnpath} />);
            }
            else
                return (<Redirect to="/" />);
        }

        return (
            <>
                {this.RenderAlerts()}
                <form className="flex flex-col space-y-2 mx-auto w-full md:w-1/2 p-5 border border-black bg-gray-200 md:rounded-md" onSubmit={this.HandleLogin.bind(this)}>
                    <Group.Box>
                        <Group.Label className="group-pre" htmlFor="username">Username:</Group.Label>
                        <Group.Input id="username" type="text" className="group-post" ref={(obj) => this.formInputs.Username = obj} />
                    </Group.Box>
                    <Group.Box>
                        <Group.Label className="group-pre" htmlFor="password">Password:</Group.Label>
                        <Group.Input id="password" type="password" className="group-post" ref={(obj) => this.formInputs.Password = obj} />
                    </Group.Box>
                    <div className="text-center">
                        <Button color="blue" className="border border-black rounded-xl">Login</Button>
                    </div>
                </form>
            </>
        );
    }
}