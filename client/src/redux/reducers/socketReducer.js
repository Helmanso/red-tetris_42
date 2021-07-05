import socketIOClient from 'socket.io-client';

const initialState = {
  socket: socketIOClient('http://localhost:4000'),
};

export const socketReducer = (state = initialState) => state;