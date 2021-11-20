import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './components/UserContext';
import Application from './components/Application';
import './Main.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.render(<UserProvider><Application /></UserProvider>, document.getElementById("render-target"));