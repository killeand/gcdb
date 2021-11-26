import React, { Component } from 'react';
import withAuth from '../../scripts/withAuth';
import UserPerms from '../../../server/UserPerms';
import $ from '../../scripts/GCDBAPI';
import _ from 'lodash';
import F from 'faker';

class Users extends Component {
    state = {
        startIndex: 3,
        users: []
    }

    componentDidMount() {
        let newData = [];

        for (let i = 0; i < F.datatype.number({min:5,max:10}); i++) {
            newData.push({
                "_id": F.datatype.uuid(),
                DisplayName: F.internet.userName(),
                Email: F.internet.email(),
                Active: F.datatype.boolean()
            });
        }

        this.setState({users: newData});
    }

    RenderUsers() {
        let index = this.state.startIndex;
        let userCount = this.state.users.length;
        let retval = [];

        if (index > userCount)
            return (<tr><td colSpan="4">No user data found</td></tr>);

        for (let i = index; i < (userCount - index); i++) {
            retval.push(this.state.users[i]);
        }

        return retval.map((user, index) => {
            return (
                <tr key={user._id}>
                    <td>{user.DisplayName}</td>
                    <td>{user.Email}</td>
                    <td>{user.Active}</td>
                    <td>Tools</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <>
                {`Total: ${this.state.users.length} Index: ${this.state.startIndex}`}
                <h1>Manage Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Display</th>
                            <th>Email</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.RenderUsers()}
                    </tbody>
                </table>
            </>
        );
    }
}

export default withAuth(null, UserPerms.Admin | UserPerms.UserManage)(Users);