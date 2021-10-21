import React, { useRef, useEffect } from 'react';

const MessagesBox = ({ messages }) => {
  const container = useRef(null);
  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);
  return (
    <div ref={container} className="chat-messages overflow-auto px-5">
      {messages.map(({ userName, body, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{userName}</b>
          {': '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
