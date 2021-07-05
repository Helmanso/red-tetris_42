const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : '*'})

const Player = require('./player')
const Room = require('./Room')

const randomTetro = require('./pieceGenerator')

const SOCKET_NEW_PLAYER = 'playeradd'
const PLAYER_EXISTS = 1
const PLAYER_ADD_SUCCESS = 2
const SOCKET_NEW_ROOM = 4
const ROOM_ADD_SUCCESS = 5
const ROOM_FULL = 7
const JOINED_LOOBY = 8
const LEADER_LEFT = 25
const SOCKET_START_GAME = 11
const SOCKET_GAME_STARTED = 12
const RECIEVE_PIECE = 19
const RECIEVE_STAGE = 21
const SOCKET_GET_PIECE = 22

var Users = {}
var Rooms = {}

io.on('connection', (socket) => {
    socket.on(SOCKET_NEW_PLAYER, (player, callback) => {
        if (!Users[player.username])
        {
            Users[player.username] =  new Player(player, false, socket.id)
            callback(PLAYER_ADD_SUCCESS)
        }
        else
            callback(PLAYER_EXISTS)
    })

    socket.on(SOCKET_NEW_ROOM, (player, callback) => {
        if (!Rooms[player.room_id])
        {
            Users[player.username] = new Player(player, true, socket.id)
            Users[player.username].hasRoom = true
            Rooms[player.room_id] = new Room(player.room_id, Users[player.username], false)

            socket.join(player.room_id)
            io.to(player.room_id).emit(JOINED_LOOBY, Rooms[player.room_id].players)
            callback(ROOM_ADD_SUCCESS)
        }
        else if (Rooms[player.room_id] && Rooms[player.room_id].players.length < 2 && Rooms[player.room_id].gameStarted == false)
        {
            if (Rooms[player.room_id].players.length == 0)
                Users[player.username] = new Player(player, true, socket.id)
            else
                Users[player.username] = new Player(player, false, socket.id)
            Users[player.username].hasRoom = true
            Rooms[player.room_id].players.push(Users[player.username])
            
            socket.join(player.room_id)
            io.to(player.room_id).emit(JOINED_LOOBY, Rooms[player.room_id].players)
            callback(ROOM_ADD_SUCCESS)
        }
        else if (Rooms[player.room_id].players.length >= 2)
            callback(ROOM_FULL)
        else
            callback(ROOM_FULL)
    })

    socket.on(SOCKET_START_GAME, (room_id) => {
        Rooms[room_id].gameStarted = true
        const stage = Array.from(Array(20), () => 
        new Array(12).fill([0, 'clear']))
        io.to(room_id).emit(RECIEVE_STAGE, stage)
        io.to(room_id).emit(RECIEVE_PIECE, randomTetro().tetro)
        io.to(room_id).emit(SOCKET_GAME_STARTED)
    })



    socket.on('disconnect', () => {
        Object.entries(Users).forEach(user => {
            if (user[1].socket_id === socket.id)
            {
                if (!Rooms[user[1].room_id])
                {
                    delete Users[user[1].username]
                    return 
                }
                Rooms[user[1].room_id].players.forEach((player, index) => {
                    if (player.username === user[1].username)
                    {
                        if (Rooms[user[1].room_id].gameStarted === true)
                        {
                            socket.broadcast.to(user[1].room_id).emit('GAME_OVER', 1)
                            socket.emit('GAME_OVER', 2)
                            Rooms[user[1].room_id].gameStarted = false
                            // go back here

                        }
                        Rooms[user[1].room_id].players.splice(index, 1)
                        io.to(user[1].room_id).emit(JOINED_LOOBY, Rooms[user[1].room_id].players)

                        if (Rooms[user[1].room_id].players.length === 1 && user[1].leader === true)
                        {
                            Rooms[user[1].room_id].players[0].leader = true
                            socket.broadcast.to(user[1].room_id).emit(LEADER_LEFT)
                        }
                    }
                })
                delete Users[user[1].username]
            }
        })
        
    })


    socket.on('ADD_LINE', (room_id, username) => {
        if (Rooms[room_id].players.length < 2)
            return
        
        Rooms[room_id].players.forEach(player => {
            if (player.username != username)
                socket.broadcast.emit('ADD_LINE')
        })
    })

    socket.on(SOCKET_GET_PIECE, (room_id, specter) => {
        io.to(room_id).emit(RECIEVE_PIECE, randomTetro().tetro)
    })

    socket.on('SEND_SPECTER', (specter, room_id) => {
        if (!Rooms[room_id])
            return
        if (Rooms[room_id].players.length === 2)
            socket.broadcast.emit('RECIEVE_SPECTER', specter)
    })


    socket.on('GAME_OVER', (room_id) => {
        if (Rooms[room_id].players.length == 2)
            socket.broadcast.to(room_id).emit('GAME_OVER', 1)
        socket.emit('GAME_OVER', 2)
        Rooms[room_id].gameStarted = false
    })

    socket.on('LOOBY_BACK', (room_id) => {
        if (!Rooms[room_id])
            return
        if (Rooms[room_id].players.length == 2)
            socket.broadcast.to(room_id).emit('LOOBY_BACK')
        socket.emit('LOOBY_BACK')
    })
})
server.listen(4000)