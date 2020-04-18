import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { PubSubContext } from '../pubsub';
import { newMessage } from '../actions/messages';

const PublishMessage = ({ username }) => {
  const [text, setText] = useState('');
  const myContext = useContext(PubSubContext);
  const updateText = e => {
    setText(e.target.value);
  };
  const publishMessage = () => {
    myContext.pubsub.publish(newMessage({ text, username }));
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') publishMessage();
  };
  return (
    <>
      <h3>Got something to say?</h3>
      <input onChange={updateText} onKeyPress={handleKeyPress} />{' '}
      <button onClick={publishMessage}>Publish it!</button>
    </>
  );
};

export default connect(({ username }) => ({ username }))(PublishMessage);
