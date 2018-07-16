import React, { Component } from 'react';

import racoon from 'images/Evil Genius Racoon.jpg';

class About extends Component {
    render() {
        return (
            <div>
                <h1>About</h1>
                <img src={racoon} alt="Evil genius racoon" />
            </div>
        );
    }
}

export default About;