import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { AutorBox } from "./view/autor/AutorBox";
import { Home } from "./view/home/Home";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

ReactDOM.render(
    (<Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" />
            </Switch>
        </App>
    </Router>),
    document.getElementById('root')
);
registerServiceWorker();
