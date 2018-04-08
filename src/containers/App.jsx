import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';

import Home from 'containers/Home';

// Lazy loaded component
// Webpacks uses this as a split point and creates a new chunk.
const About = Loadable({
    loader: () => import('./About'),
    loading: () => <div>Loading.....</div>
});

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
        );
    }
}

export default hot(module)(App);