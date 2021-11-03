import React, { Component } from 'react';
import _ from 'lodash';

export default class Group extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newProps = this.props;
        _.unset(newProps, "className");

        return (<div 
            {...newProps}
            className={classProp + " flex flex-row"}
        />);
    }
}

export class GroupTitle extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newProps = this.props;
        _.unset(newProps, "className");

        return (<div
            {...newProps}
            className={classProp + " p-1 font-bold bg-gradient-to-b from-gray-100 to-gray-400"}
        />);
    }
}

export class GroupLabel extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newProps = this.props;
        _.unset(newProps, "className");

        return (<label
            {...newProps}
            className={classProp + " p-1 font-bold bg-gradient-to-b from-gray-100 to-gray-400"}
        />);
    }
}

export class GroupText extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newProps = this.props;
        _.unset(newProps, "className");

        return (<div
            {...newProps}
            className={classProp + " p-1 flex-grow"}
        />);
    }
}

export class GroupSelect extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let newProps = this.props;
        _.unset(newProps, "className");

        return (
            <select
            {...newProps}
            className={classProp + " flex-grow"}
        />);
    }
}

export class GroupInput extends Component {
    render() {
        let classProp = (_.has(this.props, "className")) ? this.props.className : "";
        let typeProp = (_.has(this.props, "type")) ? this.props.type : "text";
        let newProps = this.props;
        _.unset(newProps, "className");
        _.unset(newProps, "type");

        return (<input
            {...newProps}
            type={typeProp}
            className={classProp + " flex-grow w-full px-2"}
        />);
    }
}

var GroupPre = ({ ...props }) => {
    if (Array.isArray(props.children)) {
        return props.children.map((child, index) => {
            let classProp = "";

            if (_.has(child.props, "className"))
                classProp = child.props.className;
            
            if (index == 0) classProp += " rounded-l-lg";
            if (index == props.children.length-1) classProp += " border-r border-white";

            if (React.isValidElement(child) && classProp != "") {
                return React.cloneElement(child, { key: index, className: classProp });
            }
            else {
                return React.cloneElement(child, { key: index });
            }
        });
    }
    else {
        if (React.isValidElement(props.children)) {
            let classProp = "";
            
            if (_.has(props.children, "props"))
                if (_.has(props.children.props, "className"))
                    classProp = props.children.props.className;
            
            return React.cloneElement(props.children, { className: classProp + " rounded-l-lg border-r border-white"});
        }
        else {
            return props.children;
        }
    }
}
var GroupPost = ({ ...props }) => {
    if (Array.isArray(props.children)) {
        return props.children.map((child, index) => {
            let classProp = "";

            if (_.has(child.props, "className"))
                classProp = child.props.className;
            
            if (index == 0) classProp += " border-l border-white";
            if (index == props.children.length-1) classProp += " rounded-r-lg";

            if (React.isValidElement(child) && classProp != "") {
                return React.cloneElement(child, { key: index, className: classProp });
            }
            else {
                return React.cloneElement(child, { key: index });
            }
        });
    }
    else {
        if (React.isValidElement(props.children)) {
            let classProp = "";

            if (_.has(props.children, "props"))
                if (_.has(props.children.props, "className"))
                    classProp = props.children.props.className;

            return React.cloneElement(props.children, { className: classProp + " rounded-r-lg border-l border-white"});
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
Group.Select = GroupSelect;
Group.Pre = GroupPre;
Group.Post = GroupPost;

export { GroupPre, GroupPost };