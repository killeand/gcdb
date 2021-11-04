import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Button from './Button';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ExecuteAPI from '../pages/ExecuteAPI';
import PageNotFound from '../pages/PageNotFound';

export default class Application extends Component {
    state = {
        showMenu: true
    };

    RenderLoggedInLinks() {
        if (window.User) {
            return (
                <>
                    <Button as={Link} to="/exe" className="bi-question-lg"> Blah Blah</Button>
                    <Button as={Link} to="/logout" className="bi-lock-fill"> Logout</Button>
                </>
            );
        }
        else {
            return (
                <>
                    <Button as={Link} to="/exe" className="bi-question-lg"> Blah Blah</Button>
                    <Button as={Link} to="/login" className="bi-key-fill"> Login</Button>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <header className="flex bg-gradient-to-b from-gray-300 to-gray-500 text-white border-b border-black">
                        <Button className="bi-list m-1 text-xl font-bold text-black border border-black rounded-xl" onClick={() => this.setState({showMenu: !this.state.showMenu})} />
                        <Link to="/" className="flex flex-row items-center">
                            <img src="images/icon.png" className="smallicon align-top mr-1" />
                            <div className="text-xl font-bold mr-2">Game Character Database</div>
                        </Link>
                    </header>
                    <main className="flex flex-col md:flex-row bg-white">
                        <aside className={"md:w-1/6 w-full " + ((this.state.showMenu)?"hidden md:block":"block md:hidden")}>
                            <nav className="flex flex-col md:border-r-2 md:border-black md:rounded-br-3xl">
                                <Button as={Link} to="/" className="bi-house-fill"> Home</Button>
                                {this.RenderLoggedInLinks()}
                            </nav>
                        </aside>
                        <div className={"md:m-2 " + ((this.state.showMenu)?"md:w-5/6 w-full":"w-full") }>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/exe" component={ExecuteAPI} />
                                <Route exact path="/404" component={PageNotFound} />
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