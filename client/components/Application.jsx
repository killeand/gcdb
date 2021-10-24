import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export default class Application extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <header className="flex flex-col items-start bg-gray-400 border-r-2 border-black">
                        <Link to="/" className="inline-flex flex-row items-center px-2 py-1 bg-blue-700 text-white border-black border-b-2 border-r-2 rounded-br-3xl">
                            <img src="images/icon.png" className="smallicon align-top mr-1" />
                            <div className="text-xl font-bold">GCDB</div>
                        </Link>
                        <nav className="flex flex-col mt-3">
                            <Link to="/">Lorem ipsum</Link>
                            <Link to="/">dolor sit amet</Link>
                            <Link to="/">consectetur</Link>
                            <Link to="/">Aenean nunc</Link>
                            <Link to="/">nec mollis urna</Link>
                            <Link to="/">magna posuere</Link>
                            <Link to="/">sit amet lectus</Link>
                            <Link to="/">a volutpat</Link>
                            <Link to="/">Maecenas et</Link>
                        </nav>
                    </header>
                    <main className="flex flex-col flex-grow">
                        <Switch>

                        </Switch>
                        <footer className="bg-gray-700">
                            Stuff
                        </footer>
                    </main>
                </BrowserRouter>
            </>
        );
    }
}