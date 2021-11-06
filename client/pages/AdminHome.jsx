import React, { Component } from 'react';
import withAuth, { withAuth2, withRouter } from '../scripts/withAuth';

class AdminHome extends Component {
    state = {
        Loaded: false
    };

    render() {
        return (
            <>
                Welcome to the Admin site
            </>
        );
    }
}

export default withAuth2()(AdminHome);