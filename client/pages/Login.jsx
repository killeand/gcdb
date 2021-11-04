import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Redirect } from 'react-router-dom';
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
        
        fetch("/data/v1/users/auth", {
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({})
        }).then((response, error) => {
            if (error) {
                console.log(error);
            }
            else {
                return response.json();
            }
        }).then((data, error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
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