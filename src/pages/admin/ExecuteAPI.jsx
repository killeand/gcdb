import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import withAuth from '../../scripts/withAuth';
import UserPerms from '../../scripts/UserPerms';
import _ from 'lodash';
import $ from '../../scripts/GCDBAPI';
import Group from '../../components/Group';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

class ExecuteAPI extends Component {
    constructor(props) {
        super(props);

        this.pathKeys = this.ObjectToArray($.Path);
    }

    state = {
        Data: [],
        ErrorMsg: "",
        Executing: "",
        Return: ""
    };

    formRef = {
        Path: React.createRef(),
        Method: React.createRef()
    };

    ObjectToArray(nextLevel) {
        let retval = [];

        for (let i = 0; i < _.keys(nextLevel).length; i++) {
            if (_.isObject(nextLevel[_.keys(nextLevel)[i]])) {
                retval = _.concat(retval, this.ObjectToArray(nextLevel[_.keys(nextLevel)[i]]));
            }
            else {
                retval.push(nextLevel[_.keys(nextLevel)[i]]);
            }
        }

        return retval;
    }

    ChangeKey(index, value) {
        let localData = this.state.Data;
        localData[index].key = value;

        this.setState({Data:localData});
    }
    ChangeValue(index, value) {
        let localData = this.state.Data;
        localData[index].value = value;

        this.setState({Data:localData});
    }

    ClickAddData(e) {
        let localData = this.state.Data;
        localData.push({key:"",value:""});

        this.setState({Data:localData});
    }
    ClickClearData(e) {
        this.setState({Data:[]});
    }
    ClickRemoveItem(index, e) {
        let localData = this.state.Data;
        localData.splice(index, 1);

        this.setState({Data:localData});
    }
    ClickExecute(e) {
        let dataBuild = {};
        let Path = findDOMNode(this.formRef.Path).value;
        let Method = findDOMNode(this.formRef.Method).value;

        this.state.Data.map((item, index) => {
            dataBuild[item.key] = item.value;
        });

        let exe = {
            Path: Path,
            Method: Method,
            Data: dataBuild
        }

        this.setState({Executing:JSON.stringify(exe, null, '\t'),ErrorMsg:"",Return:""});

        if (Method == "GET")
            $.Get(Path)
            .then((response, error) => {
                if (error) {
                    console.error(error);
                    this.setState({ErrorMsg:error.message});
                }
                else {
                    return response.json();
                }
            })
            .then((data, error) => {
                if (error) {
                    console.error(error);
                    this.setState({ErrorMsg:error.message});
                }
                else {
                    if (data.error) {
                        this.setState({ErrorMsg:data.error});
                    }
                    else {
                        this.setState({Return:JSON.stringify(data, null, '\t')});
                    }
                }
            });
        
        if (Method == "POST")
            $.Post(Path, null, dataBuild)
            .then((response, error) => {
                if (error) {
                    console.error(error);
                    this.setState({ErrorMsg:error.message});
                }
                else {
                    return response.json();
                }
            })
            .then((data, error) => {
                if (error) {
                    console.error(error);
                    this.setState({ErrorMsg:error.message});
                }
                else {
                    if (data.error) {
                        this.setState({ErrorMsg:data.error});
                    }
                    else {
                        this.setState({Return:JSON.stringify(data, null, '\t')});
                    }
                }
            });
    }

    RenderPaths() {
        return this.pathKeys.map((path, index) => {
            return (
                <option key={`path${index}`} value={path}>{path}</option>
            );
        });
    }
    RenderError() {
        if (this.state.ErrorMsg != "") {
            return (
                <Alert type="error" className="flex flex-row mb-3">
                    <div className="bi-x-circle"></div>
                    <div>
                        {this.state.ErrorMsg}
                    </div>
                </Alert>
            );
        }
    }
    RenderData() {
        return this.state.Data.map((item, index) => {
            return (
                <div key={"data-"+index} className="flex flex-row space-x-2">
                    <Group.Box>
                        <Group.Label className="group-pre">Key</Group.Label>
                        <Group.Input type="text" placeholder="Key" className="group-post" value={item.key} onChange={this.ChangeKey.bind(this, index)} />
                    </Group.Box>
                    <Group.Box>
                        <Group.Label className="group-pre">Value</Group.Label>
                        <Group.Input type="text" placeholder="Value" className="group-post" value={item.value} onChange={this.ChangeValue.bind(this, index)} />
                    </Group.Box>
                    <Button color="red" className="bi-x-circle-fill rounded-md" onClick={this.ClickRemoveItem.bind(this, index)} />
                </div>
            );
        });
    }
    RenderOutput(label, stateOutput) {
        if (!_.isEmpty(stateOutput)) {
            return (
                <div className="flex flex-col mt-3 space-y-2 w-full md:w-1/2 mx-auto border border-black bg-gray-200 p-5 md:rounded-md">
                    {label}:
                    <pre>
                        {stateOutput}
                    </pre>
                </div>
            );
        }
    }

    render() {
        return (
            <>
                {this.RenderError()}
                <form className="flex flex-col space-y-2 w-full md:w-1/2 mx-auto border border-black bg-gray-200 p-5 md:rounded-md" onSubmit={(e) => e.preventDefault()}>
                    <Group.Box>
                        <Group.Label className="group-pre">Path</Group.Label>
                        <Group.Select className="group-post" ref={(ref) => this.formRef.Path = ref}>
                            {this.RenderPaths()}
                        </Group.Select>
                    </Group.Box>
                    <Group.Box>
                        <Group.Label className="group-pre">Method</Group.Label>
                        <Group.Select className="group-post" ref={(ref) => this.formRef.Method = ref}>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                        </Group.Select>
                    </Group.Box>
                    <Group.Box>
                        <Group.Label className="group-pre flex-grow">Data</Group.Label>
                        <Button color="green" className="bi-plus-circle-fill" onClick={this.ClickAddData.bind(this)}> Add</Button>
                        <Button color="red" className="bi-x-circle-fill group-post" onClick={this.ClickClearData.bind(this)}> Clear</Button>
                    </Group.Box>
                    {this.RenderData()}
                    <Button color="blue" className="flex-grow rounded-md" onClick={this.ClickExecute.bind(this)}>Execute</Button>
                </form>
                {this.RenderOutput("Execute Code:", this.state.Executing)}
                {this.RenderOutput("Return Value:", this.state.Return)}
            </>
        );
    }
}

//export default withAuth(null, UserPerms.Admin | UserPerms.Execute)(ExecuteAPI);
export default ExecuteAPI;