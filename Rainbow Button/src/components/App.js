import React, { Component } from 'react';
import RainbowButton from './rainbowButton';
import ClickCounter from './ClickCounter';
import HoverCounter from './HoverCounter';

class App extends Component {

    render() {

        return(
            <div>
                <div>React App</div>
                <hr />
                <RainbowButton />
                <hr />
                <ClickCounter />
                <hr />
                <HoverCounter />
            </div>
        )
    }
}

export default App; // share this Component with other files in the codebase