import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import UserContext from '../components/UserContext';
import $ from '../scripts/GCDBAPI';

export default class Logout extends Component {
    static contextType = UserContext;

    state = {
        Redir: false
    }

    componentDidMount() {
        if (this.context.user) {
            this.context.stopCheck();
            setTimeout(() => this.setState({Redir: true}), 20 * 1000);
            $.Get($.Path.Users.Logout);
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