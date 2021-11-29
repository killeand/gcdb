import React, { Component } from 'react';
import withAuth from '../../scripts/withAuth';
import UserPerms from '../../../server/UserPerms';
import $ from '../../scripts/GCDBAPI';
import _ from 'lodash';
import F from 'faker';
import Button from '../../components/Button';
import Group from '../../components/Group';

class Users extends Component {
    state = {
        startIndex: 0,
        maxViews: 25,
        users: []
    }

    componentDidMount() {
        let newData = [];

        for (let i = 0; i < 50; i++) {
            newData.push({
                "_id": F.datatype.uuid(),
                DisplayName: F.internet.userName(),
                Email: F.internet.email(),
                Active: F.datatype.boolean()
            });
        }

        this.setState({users: newData});
    }

    ChangeIndex(value) {
        this.setState({startIndex:(value * this.state.maxViews)});
    }

    ChangeMax(e) {
        this.setState({maxViews:parseInt(e.target.value),startIndex:0});
    }

    RenderPagination() {
        let index = this.state.startIndex;
        let userCount = this.state.users.length;
        let maxToShow = this.state.maxViews;
        let pages = Math.ceil(userCount / maxToShow);
        let retval = [];

        for (let i = 0; i < pages; i++) {
            if (i * maxToShow != index)
                retval.push(<Button key={"page"+i} color="blue" onClick={this.ChangeIndex.bind(this, i)}>{(i + 1)}</Button>);
            else
                retval.push(<span key={"page"+i} className="px-2 py-1">{(i + 1)}</span>);
        }

        return retval;
    }

    RenderUsers() {
        let index = this.state.startIndex;
        let userCount = this.state.users.length;
        let maxToShow = this.state.maxViews;
        let retval = [];

        if (index > userCount)
            return (<tr><td colSpan="4">No user data found</td></tr>);

        if ((index + maxToShow) <= userCount) {
            userCount = index + maxToShow;
        }

        for (let i = index; i < userCount; i++) {
            retval.push(this.state.users[i]);
        }

        return retval.map((user, index) => {
            return (
                <tr key={user._id}>
                    <td>{user.DisplayName}</td>
                    <td>{user.Email}</td>
                    <td>{(user.Active)?"Yes":"No"}</td>
                    <td>Tools</td>
                </tr>
            );
        });
    }

    render() {
        console.log(this.RenderPagination());
        return (
            <>
                <h1>Manage Users</h1>
                <table className="w-full mt-3">
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
                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                <Group.Box>
                                    <Group.Label key="pagepre" className="group-pre">Pages</Group.Label>
                                    {this.RenderPagination()}
                                </Group.Box> 
                            </td>
                            <td>
                                <select value={this.state.maxViews} onChange={this.ChangeMax.bind(this)}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </>
        );
    }
}

export default withAuth(null, UserPerms.Admin | UserPerms.UserManage)(Users);