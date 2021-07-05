import { NEW_PLAYER, SOCKET_NEW_PLAYER, NEW_ROOM, SOCKET_NEW_ROOM, JOINED_LOOBY, START_GAME, SOCKET_START_GAME
        ,JOIN_URL, SOCKET_JOIN_URL, LEADER_LEFT, GAME_OVER } from "./actionTypes"

export const newPlayer = (player) => {
    return {
        type : NEW_PLAYER,
        payload : player,
        io : SOCKET_NEW_PLAYER
    }
}

export const newRoom = (player) => {
    return {
        type : NEW_ROOM,
        payload : player,
        io : SOCKET_NEW_ROOM
    }
}

export const newLooby = (players) => {
    return {
        type : JOINED_LOOBY,
        payload : players,
        io : null
    }
}

export const startGame = (type) => {
    return {
        type : START_GAME,
        payload : type,
        io : null
    }
}

export const newLeader = () => {
    return {
        type : LEADER_LEFT,
    }
}


export const gameOver = (type) => {
    return {
        type : GAME_OVER,
        payload : type
    }
}