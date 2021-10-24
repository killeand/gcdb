import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class Application extends Component {
    render() {
        return (
            <>
                <header className="flex flex-col bg-white border-r-2 border-black">
                    <div className="flex flex-row items-center px-2 py-1 bg-gray-400 text-white border-black border-b-2 border-r-2 rounded-br-3xl">
                        <img src="images/icon.png" className="smallicon align-top mr-1" />
                        <div className="text-xl font-bold">GCDB</div>
                    </div>
                    <nav>

                    </nav>
                </header>
            </>
        );
    }
}