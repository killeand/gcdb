import React, { Component } from 'react';
import withAuth from '../scripts/withAuth';

class AdminHome extends Component {
    state = {
        Loaded: false
    };

    render() {
        console.warn(this.props);
        return (
            <>
                Welcome to the Admin site
            </>
        );
    }
}

export default withAuth()(AdminHome);