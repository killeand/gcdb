import React, { Component } from 'react';

export default class Alert extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    GetBG() {
        switch (this.props.type) {
            case "error":
                return " bg-red-300 text-black";
            case "warning":
                return " bg-yellow-300 text-black";
            case "success":
                return " bg-green-300 text-black";
            default:
                return " bg-blue-300 text-black";
        }
    }

    render() {
        return (
            <>
                <div className={((this.props.className)?this.props.className:"") + this.GetBG() + " mx-5 my-1 p-2 font-bold rounded-md"}>{this.props.children}</div>
            </>
        );
    }
}