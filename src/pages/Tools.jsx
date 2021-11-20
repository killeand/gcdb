import React, { Component } from 'react';
import UserContext from '../components/UserContext';

import Loading from '../components/Loading';

export default class Tools extends Component {
    static contextType = UserContext;
    render() {
        console.log(this);
        return (
            <>
                <p>Something something <Loading small /> otherwise</p>
                <Loading />
            </>
        );
    }
}