import React from 'react';
import PublishMessage from './PublishMessage';
import MessageBoard from './MessageBoard';
import SetUsername from './SetUsername';
import './App.css';

function App() {
  return (
    <>
      <h2>Reaction</h2>
      <SetUsername />
      <br />
      <PublishMessage />
      <hr />
      <MessageBoard />
    </>
  );
}

export default App;
