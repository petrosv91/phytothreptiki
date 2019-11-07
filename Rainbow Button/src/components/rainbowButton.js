import React, { Component } from 'react';

class RainbowButton extends Component {

    state = { color: false, title: 'Click to AutoChange' };

    autoChange = () => {
        
        this.setState({ color: !this.state.color });

        if( this.state.color )
            this.setState({ title: 'Click to AutoChange' });
        else
            this.setState({ title: 'Stop' });
    }

    render() {

        const { color, title } = this.state;

        return(
            <div>
                <button className={color ? 'my-button-2' : 'my-button-1'} onClick={this.autoChange}>
                    {title}
                </button>
            </div>
        )
    }
}

export default RainbowButton;