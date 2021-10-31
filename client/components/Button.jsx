import React, { Component } from 'react';
import _ from 'lodash';

export default class Button extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newType = (_.has(this.props, "as")) ? this.props.as : null;
        let newProps = this.props;
        _.unset(newProps, "className");
        _.unset(newProps, "as");

        if (_.has(this.props, "color"))
            switch(this.props.color) {
                case "red": classProp += " bg-gradient-to-b from-red-100 to-red-400 hover:from-white hover:to-red-300"; break;
                case "green": classProp += " bg-gradient-to-b from-green-100 to-green-400 hover:from-white hover:to-green-300"; break;
                case "blue": classProp += " bg-gradient-to-b from-blue-100 to-blue-400 hover:from-white hover:to-blue-300"; break;
                case "gray": classProp += " bg-gradient-to-b from-gray-100 to-gray-400 hover:from-white hover:to-gray-300"; break;
                case "white": classProp += " bg-gradient-to-b from-white to-gray-300 hover:from-gray-100 hover:to-gray-400"; break;
                default: classProp += " bg-gradient-to-b from-gray-100 to-gray-400 hover:from-white hover:to-gray-300";
            }
        else
            classProp += " bg-gradient-to-b from-gray-100 to-gray-400 hover:from-white hover:to-gray-300";

        if (newType != null)
            return React.createElement(newType, {...newProps, className:classProp + " px-2 py-1"}, this.props.children);
        else
            return React.createElement("button", {...newProps, className:classProp + " px-2 py-1"}, this.props.children);
    }
}