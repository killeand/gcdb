import React, { Component } from 'react';

import Loading from '../components/Loading';

export default class Tools extends Component {
    render() {
        return (
            <>
                <p>Something something <Loading small /> otherwise</p>
                <Loading />
            </>
        );
    }
}