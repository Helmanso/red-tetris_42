import { GET_PIECE, GET_STAGE, NEW_POS, RECIEVE_SPECTER, RESET_GAME, ROTATE_PIECE } from "../actions/actionTypes"


const stage = {
    stage : 0,
    piece : [],
    specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
    pos: { x: 4, y : 0},
    rec : 0
}

export const stageReducer = (state = stage, action) => {
    switch(action.type)
    {

        case GET_PIECE:
            state.piece.push(action.payload)
            return {
                ...state, 
                piece : state.piece
            }
        
        case GET_STAGE:
            return {
                ...state,
                stage : action.payload
            }

        case NEW_POS:
            return {
                ...state,
                pos : action.payload
            }

        case ROTATE_PIECE:
            state.piece[0] = state.piece[0][0].map((val, index) => state.piece[0].map(row => row[index]).reverse())
            return {
                ...state,
                piece : state.piece
            }

        case RECIEVE_SPECTER:
            return {
                ...state,
                specter : action.payload
            }

        case RESET_GAME:
            return {
                piece : [],
                stage : 0,
                pos: { x: 4, y : 0},
                specter :  Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
            }
        default : return state
    }
}