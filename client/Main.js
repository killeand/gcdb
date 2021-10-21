import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';
import './Main.css';

if (module.hot) {
    console.log("Blah");
    module.hot.accept();
}

ReactDOM.render(<Application />, document.body);