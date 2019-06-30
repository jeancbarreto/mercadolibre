import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import Store from './redux/store';
import { Provider } from "react-redux";

//Pages components
import DetailsProduct from "../src/Components/DetailsProduct";
import Menu from "../src/Components/Menu";
import Bread from "../src/Components/Breadcrumbs";

const Root = () => {
    return (
        <Router basename="/app">
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/detail/:id" component={DetailsProduct} />
            </Switch>
        </Router>
    );
};
ReactDOM.render(<Provider store={Store}><Root /></Provider>, document.getElementById("root"));
ReactDOM.render(<Menu />, document.getElementById("menu")); 
ReactDOM.render(<Bread />, document.getElementById("breadcrumbs"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
