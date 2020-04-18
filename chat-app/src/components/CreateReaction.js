import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { REACTION_OBJECTS } from '../actions/types';
import { createReaction } from '../actions/reactions';
import { PubSubContext } from '../pubsub';

const CreateReaction = ({ username, messageId }) => {
  const myContext = useContext(PubSubContext);
  const publishReaction = ({ type, emoji }) => {
    myContext.pubsub.publish(
      createReaction({ type, emoji, username, messageId })
    );
  };
  return (
    <div>
      {REACTION_OBJECTS.map(REACTION_OBJECT => {
        const { type, emoji } = REACTION_OBJECT;

        return (
          <span
            style={{ margin: 5, cursor: 'pointer' }}
            key={type}
            onClick={() => publishReaction({ type, emoji })}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default connect(({ username }) => ({ username }))(CreateReaction);
