import React, { Component } from 'react';

import { isProduction } from 'globals';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <span>IsProduction: {isProduction ? "yes" : "no"}</span>
            </div>
        );
    }
}

export default Home;
