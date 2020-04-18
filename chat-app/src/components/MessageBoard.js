import React from 'react';
import { connect } from 'react-redux';
import CreateReaction from './CreateReaction';

const MessageReactions = ({ messageReactions }) => {
  if (!messageReactions) return null;
  else
    return messageReactions.map((reaction, index) => {
      const { id, emoji, username } = reaction;

      return (
        <span key={id}>
          <em>{username}:</em> {emoji}
          {index !== messageReactions.length - 1 && ', '}
        </span>
      );
    });
};

const MessageBoard = ({ messages, reactions }) => {
  return (
    <>
      {messages.items.map(messageItem => {
        const { id, timestamp, text, username } = messageItem;

        return (
          <div key={id}>
            <h4>{new Date(timestamp).toLocaleString()}</h4>
            <p>{text}</p>
            <h4>- {username}</h4>
            <CreateReaction messageId={id} />
            <MessageReactions messageReactions={reactions[id]} />
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default connect(({ messages, reactions }) => ({ messages, reactions }))(
  MessageBoard
);
