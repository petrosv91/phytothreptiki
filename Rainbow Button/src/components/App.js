import React, { Component } from 'react';
import RainbowButton from './button';

class App extends Component {
    render() {
        return(
            <div>
                <div>React App</div>
                <hr />
                <RainbowButton />
                <hr />
            </div>
        ) 
    }
}

export default App; // share this Component with other files in the codebase