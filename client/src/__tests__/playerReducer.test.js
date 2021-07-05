
import { newPlayer, newRoom, newLeader }from '../redux/actions/newPlayer'
import { playerReducer } from '../redux/reducers/playerReducer'
import { PLAYER_EXISTS, PLAYER_ADD_SUCCESS, ROOM_ADD_SUCCESS, ROOM_FULL, SOCKET_START_GAME, SOCKET_NEW_PLAYER, SOCKET_NEW_ROOM, NEW_ROOM} from "../redux/actions/actionTypes"


import configureMockStore from 'redux-mock-store';
import { applyMiddleware } from 'redux';



const middleware = () => next => action => {
    const fakesocket = jest.fn(cb => {
        switch(action.io)
        {
            case SOCKET_NEW_PLAYER:
                cb(PLAYER_ADD_SUCCESS)
                break;
            case PLAYER_EXISTS:
                cb(PLAYER_EXISTS)
                break;
            case SOCKET_NEW_ROOM:
                cb(ROOM_ADD_SUCCESS)
                break;
            case ROOM_FULL:
                cb(ROOM_FULL)
                break;
        }
    })

    if (action.io)
    {
        fakesocket((res) => {
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


            }
        })
        next(action)
    }
}
const create = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
                    }
    const next = jest.fn()

    const invoke = action => middleware()(next)(action)

    return { store, next, invoke }
}

const {next, invoke } = create()


test('Store should be changed to the action return', () => {
    expect(playerReducer(undefined, {})).toEqual({
        username : "",
        room_id : 0,
        io : null,
        hasUsername : false,
        hasRoom : false,
        leader : false,
        error : false,
        exists : false
    })
})


test('Store should be changed to the action return', () => {

    const player = {
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : false,
        hasRoom : false,
        leader : false,
        error : false,
    }

    const action = newPlayer(player)
    invoke(action)

    expect(playerReducer(undefined, action)).toEqual({
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : false,
        leader : false,
        error : true,
        exists : false
    })

})


test('Store should be changed to the action return', () => {
    const player = {
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : false,
        hasRoom : false,
        leader : false,
        error : false,
        exists : false
    }

    const action = newPlayer(player)
    action.io = PLAYER_EXISTS
    invoke(action)

    expect(playerReducer(undefined, action)).toEqual({
        username : "",
        room_id : 0,
        io : null,
        hasUsername : false,
        hasRoom : false,
        leader : false,
        error : true,
        exists : true
    })

})


test('Store should be changed to the action return', () => {
    const player = {
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : false,
        leader : false,
        error : false,
        exists : false
    }

    const action = newRoom(player)
    invoke(action)

    expect(playerReducer(player, action)).toEqual({
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : true,
        leader : false,
        error : true,
        exists : false
    })

})




test('Store should be changed to the action return', () => {
    const player = {
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : false,
        leader : false,
        error : false,
        exists : false

    }

    const action = newRoom(player)
    action.io = ROOM_FULL;
    invoke(action)

    expect(playerReducer(player, action)).toEqual({
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : false,
        leader : false,
        error : true,
        exists : true
    })

})



test('Store should be changed to the action return', () => {
    const player = {
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : false,
        leader : false,
        error : false,
        exists : false
    }

    const action = newRoom(player)
    invoke(action)

    expect(playerReducer(player, action)).toEqual({
        username : "HAKIM",
        room_id : 0,
        io : null,
        hasUsername : true,
        hasRoom : true,
        leader : false,
        error : true,
        exists : false

    })

})


test('Store should be changed to the action return', () => {
   

    expect(playerReducer(undefined, newLeader(5))).toEqual({
        username : "",
        room_id : 0,
        io : null,
        hasUsername : false,
        hasRoom : false,
        leader : true,
        error : false,
        exists : false

    })

})
