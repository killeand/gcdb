import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import UserContext from './UserContext';
import UserPerms from '../scripts/UserPerms';
import Button from './Button';
import Loading from './Loading';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Logout = lazy(() => import('../pages/Logout'));
const ExecuteAPI = lazy(() => import('../pages/admin/ExecuteAPI'));
const Admin = lazy(() => import('../pages/admin/Admin'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const Tools = lazy(() => import('../pages/tools/Tools'));
const AdminUsers = lazy(() => import('../pages/admin/Users'));

export default class Application extends Component {
    static contextType = UserContext;

    state = {
        ShowMenu: true
    };

    RenderLoggedInLinks() {
        let MenuButtons = [];

        MenuButtons.push(<Button key="menu1" as={Link} to="/" className="bi-house"> Home</Button>);
        MenuButtons.push(<Button key="menu2" as={Link} to="/tools" className="bi-screwdriver"> Tools</Button>);

        if (!_.isEmpty(this.context.user)) {
            if (UserPerms.Test(this.context.user.Perms, UserPerms.Admin)) {
                MenuButtons.push(<Button key="menu3" as={Link} to="/admin" className="bi-gear"> Admin</Button>);

                if (UserPerms.Test(this.context.user.Perms, UserPerms.UserManage)) {
                    MenuButtons.push(<Button key="menu4" as={Link} to="/admin/users" className="bi-people pl-7"> Users</Button>);
                }

                if (UserPerms.Test(this.context.user.Perms, UserPerms.Execute)) {
                    MenuButtons.push(<Button key="menu5" as={Link} to="/admin/exe" className="bi-terminal pl-7"> Execute</Button>);
                }
            }
        }

        if (_.isEmpty(this.context.user)) {
            MenuButtons.push(<Button key="menu15" as={Link} to="/login" className="bi-key"> Login</Button>);
        }
        else {
            MenuButtons.push(<Button key="menu15" as={Link} to="/logout" className="bi-key"> Logout</Button>);
        }

        return MenuButtons;
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <header className="flex bg-gradient-to-b from-gray-300 to-gray-500 text-white border-b border-black">
                        <Button className="bi-list m-1 text-xl font-bold text-black border border-black rounded-xl" onClick={() => this.setState({ShowMenu: !this.state.ShowMenu})} />
                        <Link to="/" className="flex flex-row items-center">
                            <img src="/src/images/icon.png" className="smallicon align-top mr-1" />
                            <div className="text-xl font-bold mr-2">Game Character Database</div>
                        </Link>
                    </header>
                    <main className="flex flex-col md:flex-row bg-white">
                        <aside className={"md:w-1/6 w-full " + ((this.state.ShowMenu)?"hidden md:block":"block md:hidden")}>
                            <nav className="flex flex-col md:border-r-2 md:border-black md:rounded-br-3xl">
                                {this.RenderLoggedInLinks()}
                            </nav>
                        </aside>
                        <div className={"md:m-2 " + ((this.state.ShowMenu)?"md:w-5/6 w-full":"w-full") }>
                            <Switch>
                                <Route exact path="/" render={() => <Suspense fallback={<Loading />}><Home /></Suspense>} />
                                <Route exact path="/login" render={() => <Suspense fallback={<Loading />}><Login /></Suspense>} />
                                <Route exact path="/logout" render={() => <Suspense fallback={<Loading />}><Logout /></Suspense>} />
                                <Route exact path="/admin" render={() => <Suspense fallback={<Loading />}><Admin /></Suspense>} />
                                <Route exact path="/admin/users" render={() => <Suspense fallback={<Loading />}><AdminUsers /></Suspense>} />
                                <Route exact path="/admin/exe" render={() => <Suspense fallback={<Loading />}><ExecuteAPI /></Suspense>} />
                                <Route exact path="/tools" render={() => <Suspense fallback={<Loading />}><Tools /></Suspense>} />
                                <Route exact path="/404" render={() => <Suspense fallback={<Loading />}><PageNotFound /></Suspense>} />
                                <Route>
                                    <Redirect to="/404" />
                                </Route>
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