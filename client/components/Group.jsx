import React, { Component } from 'react';

export default class Group extends Component {
    render() {
        let className = (this.props.className) ? this.props.className : "";

        return (<div 
            {...this.props}
            className={className + " flex flex-row"}
        />);
    }
}

export class GroupTitle extends Component {
    render() {
        let className = (this.props.className) ? this.props.className : "";

        return (<div
            {...this.props}
            className={className + " p-1 font-bold bg-gray-300"}
        />);
    }
}

export class GroupLabel extends Component {
    render() {
        let className = (this.props.className) ? this.props.className : "";

        return (<label
            {...this.props}
            className={className + " p-1 font-bold bg-gray-300"}
        />);
    }
}

export class GroupText extends Component {
    render() {
        let className = (this.props.className) ? this.props.className : "";

        return (<div
            {...this.props}
            className={className + " p-1 flex-grow"}
        />);
    }
}

export class GroupInput extends Component {
    render() {
        let className = (this.props.className) ? this.props.className : "";
        let type = (this.props.type) ? this.props.type : "text";

        return (<input
            {...this.props}
            type={type}
            className={className + " flex-grow px-2"}
        />);
    }
}

var GroupPre = ({ ...props }) => {
    if (Array.isArray(props.children)) {
        return props.children.map((child, index) => {
            let finalStyles = null;
            
            if (index == 0) finalStyles += " rounded-l-lg";
            if (index == props.children.length-1) finalStyles += " border-r border-white";

            if (React.isValidElement(child) && finalStyles != null) {
                return React.cloneElement(child, { key: index, className: child.props.className + finalStyles });
            }
            else {
                return React.cloneElement(child, { key: index });
            }
        });
    }
    else {
        if (React.isValidElement(props.children)) {
            return React.cloneElement(props.children, { className: props.children.props.className + " rounded-l-lg border-r border-white"});
        }
        else {
            return props.children;
        }
    }
}
var GroupPost = ({ ...props }) => {
    if (Array.isArray(props.children)) {
        return props.children.map((child, index) => {
            let finalStyles = null;
            
            if (index == 0) finalStyles += " border-l border-white";
            if (index == props.children.length-1) finalStyles += " rounded-r-lg";

            if (React.isValidElement(child) && finalStyles != null) {
                return React.cloneElement(child, { key: index, className: child.props.className + finalStyles });
            }
            else {
                return React.cloneElement(child, { key: index });
            }
        });
    }
    else {
        if (React.isValidElement(props.children)) {
            return React.cloneElement(props.children, { className: props.children.props.className + " rounded-r-lg border-l border-white"});
        }
        else {
            return props.children;
        }
    }
}

Group.Title = GroupTitle;
Group.Label = GroupLabel;
Group.Text = GroupText;
Group.Input = GroupInput;
Group.Pre = GroupPre;
Group.Post = GroupPost;

export { GroupPre, GroupPost };