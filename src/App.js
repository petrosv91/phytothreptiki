import React from 'react';
import './App.css';
import AutoComplete from './AutoComplete';

function App() {

  return (
      <div className="App">
        <div className="App-Component">
            <AutoComplete 
              suggestions={[
                "Alligator",
                "Bask",
                "Crocodilian",
                "Death Roll",
                "Eggs",
                "Jaws",
                "Reptile",
                "Solitary",
                "Tail",
                "Wetlands"
              ]}
            />
        </div>
      </div>
  );
}

export default App;
