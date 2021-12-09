import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import UserContext from '../components/UserContext';
import $ from '../scripts/GCDBAPI';
import TM from '../scripts/TokenManager';

export default class Logout extends Component {
    static contextType = UserContext;

    state = {
        Redir: false
    }

    componentDidMount() {
        if (this.context.user) {
            $.Post($.Path.Auth.Logout, null, {refresh_token: TM.GetRefresh()});
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            this.context.setUser(null);
            setTimeout(() => this.setState({Redir: true}), 20 * 1000);
        }
        else {
            this.setState({Redir: true});
        }
    }

    render() {
        if (this.state.Redir) return (<Redirect to="/" />);

        return (
            <p>You have been logged out. Redirecting you to the <Link to="/">main page</Link> in 20 seconds.</p>
        );
    }
}