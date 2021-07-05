import { GAME_OVER, JOINED_LOOBY,  START_GAME } from "../actions/actionTypes"

const looby = {
    players : [],
    gameStarted : false,
    gameOver : 0
}

export const loobyReducer = (state = looby, action) => {
    switch (action.type)
    {
        case JOINED_LOOBY:
            return {
                ...state,
                players : action.payload
            }

        case START_GAME : 
            return {
                ...state,
                gameStarted : action.payload,
                gameOver : 0
            }

        case GAME_OVER :
            return {
                ...state,
                gameOver : action.payload
            }
        default : return state
    }
}