import React, { Component } from 'react';
import _ from 'lodash';

export default class Loading extends Component {
    render() {
        if (this.props.small) {
            return (
                <span className="bi-gear-wide-connected leading-3 animate-spin inline-block items-center justify-center p-0 w-4 h-4"></span>
            );
        }
        else {
            return (
                <div className="flex items-center justify-center">
                    <img src="/images/kefka.gif" />
                </div>
            );
        }
    }
}