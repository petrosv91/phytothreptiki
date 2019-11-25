import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {

  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  state = {
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ""
  };

  handleChange = e => {

    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  handleClick = e => {

    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  handleKeyDown = e => {

    const { activeSuggestion, filteredSuggestions } = this.state;

    // update the input and close the suggestions
    if (e.key === 'Enter') {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }

    // decrement the index
    else if (e.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    // increment the index
    else if (e.key === 'ArrowDown') {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    } 
  };

  suggestionsListComponent = () => {

    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput
    } = this. state;
 
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {

        return (
          <ul class="suggestions">
            {
              filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li
                    className={className}
                    key={suggestion}
                    onClick={this.handleClick}
                  >
                    {suggestion}
                  </li>
                );
              })
            }
          </ul>
        );
      } else {

        return (
          <div class="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }
  }

  render() {

    const { userInput } = this.state;

    return (
      <Fragment>
        <input
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={userInput}
        />
        {this.suggestionsListComponent()}
      </Fragment>
    );
  }
}

export default Autocomplete;