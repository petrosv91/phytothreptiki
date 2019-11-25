import React, { Component } from 'react';

class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.items = [
            'David',
            'Damien',
            'Sara',
            'Jane',
        ];
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {

        const value = e.target.value;
        let suggestions = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions, text: value}));
    }
    
    renderSuggestions() {

        const {suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul>
                {suggestions.map(item => 
                    <li 
                        onClick={() => this.suggestionSelected(item)} 
                    >
                        {item}
                    </li>
                )}
            </ul>
        );
    }

    suggestionSelected(value) {

        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    handleKeyDown = e => {

        if (e.key === 'ArrowDown') {
            
        } else if (e.key === 'ArrowUp') {
           
        }
    }

    handleKeyPress = e => {
        if( e.key === 'Enter' ) {        
            
        }
    }

    render() {
        const { text } = this.state;
        return (
            <div className='AutoCompleteText'>
                <input 
                    value={text} 
                    onChange={this.onTextChanged} 
                    type="text" 
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.handleKeyPress} />
                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutoComplete;