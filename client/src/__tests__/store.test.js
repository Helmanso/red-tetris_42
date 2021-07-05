
import { newPlayer, newRoom, newLeader }from '../redux/actions/newPlayer'
import { PLAYER_EXISTS, PLAYER_ADD_SUCCESS, ROOM_ADD_SUCCESS, ROOM_FULL, SOCKET_START_GAME, SOCKET_NEW_PLAYER, SOCKET_NEW_ROOM, NEW_ROOM} from "../redux/actions/actionTypes"


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


describe('Testing The redux store', () => {

    test('testing the switch cases', () => {

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
        expect(player.hasUsername).toBe(true)
    })
})
