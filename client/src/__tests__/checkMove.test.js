

import { checkMove, checkMove2 } from '../Components/checkMove'

describe('Testing checkMove function', () => {

    it('Does not work properly', () => {
        const props = {
            player : {
                username : "",
                room_id : 0,
                error : true,
                leader : true,
            },
            socket : {
                socket : null
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

        expect(checkMove(0, 0, props)).toBe(false)
    })


})