import React, { Component } from 'react';

import { isProduction, version } from 'globals';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <span>IsProduction: {isProduction ? "yes" : "no"}</span>
                <p>Version: {version}</p>
            </div>
        );
    }
}

export default Home;
