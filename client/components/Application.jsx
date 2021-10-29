import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from '../pages/Home';

export default class Application extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <header className="flex items-start">
                        <Link to="/" className="flex flex-row items-center px-2 py-1 bg-gradient-to-b from-blue-700 to-gray-800 text-white border-black border-b-2 border-r-2 rounded-br-3xl">
                            <img src="images/icon.png" className="smallicon align-top mr-1" />
                            <div className="text-xl font-bold mr-2">Game Character Database</div>
                        </Link>
                    </header>
                    <main className="flex">
                        <aside className="w-1/6">
                            <nav className="flex flex-col border-r-2 border-black rounded-br-3xl">
                                <Link to="/" className="bi-alarm"> Lorem ipsum</Link>
                                <Link to="/" className="bi-cloud-sleet-fill"> dolor sit amet</Link>
                                <Link to="/" className="bi-cpu-fill"> consectetur</Link>
                                <Link to="/" className="bi-exclamation-diamond-fill"> Aenean nunc</Link>
                                <Link to="/" className="bi-fingerprint"> nec mollis urna</Link>
                                <Link to="/" className="bi-info-circle-fill"> magna posuere</Link>
                                <Link to="/" className="bi-newspaper"> sit amet lectus</Link>
                                <Link to="/" className="bi-radioactive"> a volutpat</Link>
                                <Link to="/" className="bi-terminal-fill"> Maecenas et</Link>
                            </nav>
                        </aside>
                        <div className="w-5/6 mx-2">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/404">Page not found</Route>
                                <Route><Redirect to="/404" /></Route>
                            </Switch>
                        </div>
                    </main>
                    <footer className="flex bg-gradient-to-b from-white to-gray-300 p-1 justify-center">
                        Jason Johnston &copy; 2021
                    </footer>
                </BrowserRouter>
            </>
        );
    }
}