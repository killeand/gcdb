import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class Application extends Component {
    render() {
        return (
            <>
                <header className="inline-flex flex-col bg-white border-r-2 border-b-2 border-gray-400 rounded-br-3xl">
                    <div className="flex flex-col items-center justify-center m-2">
                        <div className="flex flex-row text-4xl font-bold"><img src="images/icon.png" className="mr-3" />GCDB</div>
                        <div className="text-xs font-bold">Game Character Database</div>
                    </div>
                    <nav>

                    </nav>
                </header>
            </>
        );
    }
}