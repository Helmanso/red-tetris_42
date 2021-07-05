import { GET_PIECE, GET_STAGE, NEW_POS, RECIEVE_SPECTER, ROTATE_PIECE, RESET_GAME } from "./actionTypes"


export const getStage = (stage) => {
    return {
        type : GET_STAGE,
        payload : stage
    }
}

export const getPiece = (piece) => {
    return {
        type : GET_PIECE,
        payload : piece
    }
}


export const newPos = (pos) => {
    return {
        type : NEW_POS,
        payload : pos
    }
}

export const rotatePiece = (piece) => {
    return {
        type : ROTATE_PIECE,
        payload : piece
    }
}


export const getSpecter = (specter) => {
    return {
            type : RECIEVE_SPECTER,
            payload : specter
        }
}

export const resetGame = () => {
    return {
        type : RESET_GAME
    }
}