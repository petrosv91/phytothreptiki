import React, { Component } from 'react';

class RainbowButton extends Component {

    state = { color: true }

    render() {
        return(
            <div>
                <button>Change Color</button>
            </div>
        )
    }
}

export default RainbowButton;