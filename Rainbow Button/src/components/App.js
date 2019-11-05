import React, { Component } from 'react';
import RainbowButton from './rainbowButton';

class App extends Component {

    state = ({ flag: false, title: 'Show me' });

    displayMe = () => {

        this.setState({ flag: !this.state.flag });
        
        if( this.state.flag )
            this.setState({ title: 'Show me' });
        else  
            this.setState({ title: 'Hide me' });
    }

    render() {

        const { title } = this.state;

        return(
            <div>
                <div>React App</div>
                <hr />
                <RainbowButton />
                <hr />
                <button onClick={this.displayMe}>{title}</button>
            </div>
        ) 
    }
}

export default App; // share this Component with other files in the codebase