import { createStore, applyMiddleware } from "redux";
import { playerReducer } from "../reducers/playerReducer";
import { combineReducers } from "redux";
import { socketReducer } from '../reducers/socketReducer'
import { loobyReducer } from "../reducers/LoobyReducer";
import { stageReducer } from "../reducers/stageReducer";

import socketIOClient from 'socket.io-client';
import { PLAYER_EXISTS, PLAYER_ADD_SUCCESS, ROOM_ADD_SUCCESS, ROOM_FULL, SOCKET_START_GAME} from "../actions/actionTypes";

export const middleware = () => next => action => {

    const io = state.socket.socket
    if (action.io)
    {
        io.emit(action.io, (action.payload), (res) => {
            switch(res)
            {
                case PLAYER_ADD_SUCCESS:
                    action.payload.hasUsername = true
                    break;
                case PLAYER_EXISTS:
                    action.type = PLAYER_EXISTS
                    break;
                case ROOM_ADD_SUCCESS:
                    action.payload.hasRoom = true
                    break;
                case ROOM_FULL:
                    action.type = ROOM_FULL
                    break;
                case SOCKET_START_GAME:
                    break;
            }
            next(action)
        })
    } 
    else
        next(action)
    }
                
const reducers = combineReducers({
    player : playerReducer,
    socket : socketReducer,
    looby : loobyReducer,
    stage : stageReducer
})
const store = createStore(reducers, applyMiddleware(middleware))
const state = store.getState()

export default store