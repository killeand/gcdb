import React, { Component } from 'react';
import _ from 'lodash';
import TM from '../scripts/TokenManager';

const UserContext = React.createContext(null);

export class UserProvider extends Component {
    constructor(props) {
        super(props);

        let Token = TM.DecodeAuth();
        let UserData = null;
        if (!_.isNil(Token)) {
            UserData = Token.user;
        }

        this.state = {
            UserData: UserData
        }
    }

    SetUserData(value) {
        this.setState({UserData: value});
    }

    render() {
        let user = this.state.UserData;
        let setUser = this.SetUserData.bind(this);

        return (
            <UserContext.Provider value={{user, setUser}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;