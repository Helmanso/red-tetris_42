import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import Looby from '../Components/Looby'
import { SOCKET_GAME_STARTED, JOINED_LOOBY, RECIEVE_STAGE, RECIEVE_PIECE, SOCKET_START_GAME, LEADER_LEFT } from '../redux/actions/actionTypes'

const { createServer } = require("http")
const { Server } = require("socket.io")
const Client = require("socket.io-client");

describe('Testing Looby Component', () => {


    let io, serverSocket, clientSocket;


    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
          const port = httpServer.address().port;
          clientSocket = new Client(`http://localhost:${port}`);
          io.on("connection", (socket) => {
            serverSocket = socket;
          });
          clientSocket.on("connect", done);
        });
    });


 


    it('Does not render correctly', () => {
        const props = {
            player : {
                username : "",
                room_id : 0,
                error : true,
                leader : true,
            },
            socket : {
                socket : clientSocket
            },
            looby : {
                players : [{username:"test"}]
            },
            
            newRoom: jest.fn(() => 42),
            newLooby : jest.fn((players) => players),
            getStage: jest.fn(() => 42),
            getPiece: jest.fn(() => 42),
            startGame: jest.fn(() => 42),
            newLeader: jest.fn(() => 42),
        }
        
        const { queryByPlaceholderText } = render(<Looby props={props} />)
        expect(queryByPlaceholderText("looby-output")).toBeTruthy()
        expect(queryByPlaceholderText("looby-button")).toBeTruthy()
    })



    it('Does not dispatch startGame action', (done) => {
        const props = {
            player : {
                username : "test",
                room_id : 0,
                error : true,
                leader : true,
            },
            socket : {
                socket : clientSocket
            },
            looby : {
                players : [{username:"test", leader:true}, {username:"hakim", leader:false}, {username:"test2", leader:false}]

            },
            
            newRoom: jest.fn(() => 42),
            newLooby : jest.fn((players) => players),
            getStage: jest.fn(() => 42),
            getPiece: jest.fn(() => 42),
            startGame: jest.fn(() => 42),
            newLeader: jest.fn(() => 42),
        }

        const { queryByPlaceholderText } = render(<Looby props={props} />)
        const loobyButton = queryByPlaceholderText('looby-button')
        fireEvent.click(loobyButton)

        serverSocket.emit(RECIEVE_STAGE, null)

        setTimeout(() => {
            expect(props.getStage).toHaveBeenCalledTimes(1)
            done()
        }, 50)

        serverSocket.emit(RECIEVE_PIECE, null)

        setTimeout(() => {
            expect(props.getPiece).toHaveBeenCalledTimes(1)
            done()
        }, 50)

        serverSocket.emit(SOCKET_GAME_STARTED)

        setTimeout(() => {
            expect(props.startGame).toHaveBeenCalledTimes(1)
            done()
        }, 50)


        serverSocket.emit(JOINED_LOOBY, null)

        setTimeout(() => {
            expect(props.newLooby).toHaveBeenCalledTimes(1)
            done()
        }, 50)

        serverSocket.emit(LEADER_LEFT)

        setTimeout(() => {
            expect(props.newLeader).toHaveBeenCalledTimes(1)
            done()
        }, 50)
    })



    it('Leader loop does something wrong', () => {
        const props = {
            player : {
                username : "test",
                room_id : 0,
                error : true,
                leader : true,
            },
            socket : {
                socket : clientSocket
            },
            looby : {
                players : [{username:"test", leader:false}, {username:"hakim", leader:false}, {username:"test2", leader:false}]

            },
            
            newRoom: jest.fn(() => 42),
            newLooby : jest.fn((players) => players),
            getStage: jest.fn(() => 42),
            getPiece: jest.fn(() => 42),
            startGame: jest.fn(() => 42),
            newLeader: jest.fn(() => 42),
        }

        render(<Looby props={props} />)
    })



})