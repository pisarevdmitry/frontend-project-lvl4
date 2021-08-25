import React from 'react';

export const UserContext = React.createContext({
  user: null,
  updateUser: () => {},
});

export const SocketContext = React.createContext({
  socket: null,
});
