import React, { Component } from 'react';

const UserContext = React.createContext(null);

export class UserProvider extends Component {
    state = {
        data: null
    }

    setUser(value) {
        this.setState({data:value});
    }

    render() {
        let user = this.state.data;
        let setUser = this.setUser.bind(this);

        return (
            <UserContext.Provider value={{user, setUser}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;