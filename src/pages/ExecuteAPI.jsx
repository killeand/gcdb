import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';

import Group from '../components/Group';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default class ExecuteAPI extends Component {
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

    ChangeKey(index, e) {
        let localData = this.state.Data;
        localData[index].key = e.target.value;

        this.setState({Data:localData});
    }
    ChangeValue(index, e) {
        let localData = this.state.Data;
        localData[index].value = e.target.value;

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

        this.state.Data.map((item, index) => {
            dataBuild[item.key] = item.value;
        });

        let exe = {
            Path: findDOMNode(this.formRef.Path.current).value,
            Method: findDOMNode(this.formRef.Method.current).value,
            Body: dataBuild
        };

        this.setState({Executing:JSON.stringify(exe, null, '\t'),ErrorMsg:"",Return:""});

        let finalData = {
            headers: {
                "content-type": "application/json"
            },
            method: exe.Method
        }

        if (exe.Method != "GET") {
            finalData["body"] = JSON.stringify(exe.Body);
        }

        fetch(exe.Path, finalData).then((response, error) => {
            if (error) {
                console.error(error);
                this.setState({ErrorMsg:error.message});
            }
            else {
                return response.json();
            }
        }).then((data, error) => {
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
                    <Group>
                        <Group.Pre>
                            <Group.Label>Key</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Input type="text" placeholder="Key" value={this.state.Data[index].key} onChange={this.ChangeKey.bind(this, index)}></Group.Input>
                        </Group.Post>
                    </Group>
                    <Group>
                        <Group.Pre>
                            <Group.Label>Value</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Input type="text" placeholder="Value" value={this.state.Data[index].value} onChange={this.ChangeValue.bind(this, index)}></Group.Input>
                        </Group.Post>
                    </Group>
                    <Button color="red" className="bi-x-circle-fill rounded-md" onClick={this.ClickRemoveItem.bind(this, index)} />
                </div>
            );
        });
    }
    RenderExecution() {
        if (this.state.Executing != "") {
            return (
                <div className="flex flex-col mt-3 space-y-2 w-full md:w-1/2 mx-auto border border-black bg-gray-200 p-5 md:rounded-md">
                    Currently Executing:
                    <pre>
                        {this.state.Executing}
                    </pre>
                </div>
            );
        }
    }
    RenderReturn() {
        if (this.state.Return != "") {
            return (
                <div className="flex flex-col mt-3 space-y-2 w-full md:w-1/2 mx-auto border border-black bg-gray-200 p-5 md:rounded-md">
                    Data Return:
                    <pre>
                        {this.state.Return}
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
                    <Group>
                        <Group.Pre>
                            <Group.Label>Path</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Input type="text" defaultValue="/data/v1/" ref={this.formRef.Path} />
                        </Group.Post>
                    </Group>
                    <Group>
                        <Group.Pre>
                            <Group.Label>Method</Group.Label>
                        </Group.Pre>
                        <Group.Post>
                            <Group.Select ref={this.formRef.Method}>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </Group.Select>
                        </Group.Post>
                    </Group>
                    <Group>
                        <Group.Pre>
                            <Group.Label className="flex-grow">Data</Group.Label>
                        </Group.Pre>
                        <Button color="green" className="bi-plus-circle-fill" onClick={this.ClickAddData.bind(this)}> Add</Button>
                        <Group.Post>
                            <Button color="red" className="bi-x-circle-fill" onClick={this.ClickClearData.bind(this)}> Clear</Button>
                        </Group.Post>
                    </Group>
                    {this.RenderData()}
                    <Button color="blue" className="flex-grow rounded-md" onClick={this.ClickExecute.bind(this)}>Execute</Button>
                </form>
                {this.RenderExecution()}
                {this.RenderReturn()}
            </>
        );
    }
}