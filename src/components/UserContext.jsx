import _ from 'lodash';
import React, { Component } from 'react';
import $ from '../scripts/GCDBAPI';

const UserContext = React.createContext(null);

export class UserProvider extends Component {
    state = {
        data: null
    }

    checkTimer = null;
    firstLoad = false;

    StartCheck(passedThis) {
        let newThis = null;

        if (_.has(this, "state")) newThis = this;
        else newThis = passedThis;

        // $.Get($.Path.Users.Check)
        // .then((response, error) => {
        //     return response.json();
        // })
        // .then((data, error) => {
        //     if (_.has(data, "error")) {
        //         newThis.StopCheck();
        //     }
        //     else {
        //         if (newThis.checkTimer == null) {
        //             newThis.checkTimer = setInterval(() => newThis.StartCheck(newThis), 60 * 1000);
        //             newThis.setState({data:data});
        //         }
        //     }   
        // })
    }

    StopCheck() {
        clearInterval(this.checkTimer);
        this.checkTimer = null;
        this.setState({data:null});
    }

    render() {
        if (!this.firstLoad) {
            this.StartCheck();
            this.firstLoad = true;
        }

        let user = this.state.data;
        let startCheck = this.StartCheck.bind(this);
        let stopCheck = this.StopCheck.bind(this);

        return (
            <UserContext.Provider value={{user, startCheck, stopCheck}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContext;