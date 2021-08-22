import React from 'react';

const MessagesBox = ({ messages }) => (
  <div className="chat-messages overflow-auto px-5">
    {messages.map(({ userName, body, id }) => (
      <div key={id} className="text-break mb-2">
        <b>{userName}</b>
        {': '}
        {body}
      </div>
    ))}
  </div>
);

export default MessagesBox;
