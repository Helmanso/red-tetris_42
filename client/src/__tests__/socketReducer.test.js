import { socketReducer } from '../redux/reducers/socketReducer'
import socketIOClient from 'socket.io-client';

test('socket should be initialized correctly', () => {
    const initialState = {
        socket: 'test'
      };

    expect(socketReducer(initialState)).toEqual({
        socket: 'test'
    })
})