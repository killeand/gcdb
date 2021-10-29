import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Group from '../components/Group';
import Alert from '../components/Alert';

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

        // window.Socket.emit(
        //     "/auth/login",
        //     {
        //         Email: this.FormInputs.Username.current.value,
        //         Password: this.FormInputs.Password.current.value 
        //     }, 
        //     (res) => {
        //         if (res.code == 0) {
        //             window.User = { Token: res.response };

        //             this.setState({LoginSuccess: true});
        //         }
        //         else {
        //             this.setState({ErrorMsg: `(${res.code}) ${res.response}`})
        //         }
        //     }
        // );
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
                <form className="flex flex-col space-y-2 p-5 border border-black bg-blue-300 rounded-md" onSubmit={this.HandleLogin.bind(this)}>
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
                        <button>Login</button>
                    </div>
                </form>
            </>
        );
    }
}