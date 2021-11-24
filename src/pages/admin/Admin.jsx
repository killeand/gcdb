import React, { Component } from 'react';
import withAuth from '../../scripts/withAuth';
import UserPerms from '../../scripts/UserPerms';
import UserContext from '../../components/UserContext';

class Admin extends Component {
    static contextType = UserContext;

    render() {
        return (
            <>
                Welcome to the Admin site
            </>
        );
    }
}

export default withAuth(null, UserPerms.Admin)(Admin);