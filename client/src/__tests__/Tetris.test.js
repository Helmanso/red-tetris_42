import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import { Specter } from '../Components/Styled/StyledSpecter';
import Tetris from '../Components/Tetris'
import { RECIEVE_PIECE } from '../redux/actions/actionTypes';

import { checkMove, checkMove2 } from '../Components/checkMove'

const { createServer } = require("http")
const { Server } = require("socket.io")
const Client = require("socket.io-client");

describe('Testing Tetris Component', () => {

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

  

    it('Does not render correctly', (done) => {

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
                players : [{username:"test"}, {username:"yes"}],
                gameOver : false
            },
            stage : {
                piece :  [[[0, 0, 0], ['L', 'L', 'L'], [0, 0, 0]]],
                pos : {x : 0, y: 0},
                stage : Array.from(Array(20), () => 
                new Array(12).fill([0, 'done'])),
                specter : Array.from(Array(20), () => new Array(12).fill(['J', 'clear']))
            },
            newRoom: jest.fn(() => 42),
            newLooby : jest.fn((players) => players),
            getStage: jest.fn(() => 42),
            getPiece: jest.fn(() => 42),
            startGame: jest.fn(() => 42),
            newLeader: jest.fn(() => 42),
            newPos: jest.fn(() => 42),
            getSpecter : jest.fn(() => 42),
            gameOver : jest.fn(() => 42),
            resetGame : jest.fn(() => 42),
            rotatePiece : jest.fn(() => 42)
        }
        const { queryByPlaceholderText, queryByRole } = render(<Tetris props={props} />)

      

        const background = queryByRole('button')
        fireEvent.keyDown(background, {key: 'Space', code :'Space'})
        serverSocket.emit(RECIEVE_PIECE, null, () => {
        })
        
        setTimeout(() => {
            expect(props.getPiece).toHaveBeenCalledTimes(1)

        }, 50)

        serverSocket.emit('RECIEVE_SPECTER', null)
        
        setTimeout(() => {
            expect(props.getSpecter).toHaveBeenCalledTimes(1)            
       }, 50)
        
        serverSocket.emit('ADD_LINE')
        
        setTimeout(() => {
            expect(props.getStage).toHaveBeenCalledTimes(2)

        }, 50)

        serverSocket.emit('GAME_OVER', null)
        
        setTimeout(() => {
            expect(props.gameOver).toHaveBeenCalledTimes(1)
        }, 50)


        serverSocket.emit('LOOBY_BACK')
        
        setTimeout(() => {
            expect(props.startGame).toHaveBeenCalledTimes(1)
            expect(props.resetGame).toHaveBeenCalledTimes(1)
            done()

        }, 50)
    })

})