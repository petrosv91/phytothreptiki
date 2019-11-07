import React, { Component } from 'react';

const UpdatedComponent = WrappedComponent => {

    class NewComponent extends Component {

        state = { count: 0 };

        incrementCount = () => {
        
            this.setState( prevState => prevState.count++ );
        }

        render() {

            return(
                <WrappedComponent count={this.state.count} incrementCount={this.incrementCount} />
            )
        }
    }

    return NewComponent;
}

export default UpdatedComponent;