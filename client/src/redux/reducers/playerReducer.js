import { NEW_PLAYER, PLAYER_EXISTS, NEW_ROOM, ROOM_FULL, GAME_STARTED, JOIN_URL, JOIN_FAILED, LEADER_LEFT} from "../actions/actionTypes"

const player = {
    username : "",
    room_id : 0,
    io : null,
    hasUsername : false,
    hasRoom : false,
    leader : false,
    error : false,
    exists : false
}

export const playerReducer = (state = player, action) => {
    switch(action.type)
    {
        case NEW_PLAYER :
            return {

                ...state,
                username: action.payload.username,
                hasUsername: action.payload.hasUsername,
                error : true,
                exists : false
            }
        
        case PLAYER_EXISTS : 
            return {
                ...state,
                error : true,
                exists : true
            }

        case NEW_ROOM :
            return {
                ...state,
                room_id : action.payload.room_id,
                hasRoom : true,
                error : true,
                exists : false

            }

        case ROOM_FULL :
            return {
                ...state,
                error : true,
                exists : true

            }

        case LEADER_LEFT:
            return {
                ...state,
                leader : true
            }
        default : return state
    }
} 