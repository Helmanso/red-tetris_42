
import { stageReducer } from '../redux/reducers/stageReducer'
import { getPiece, getStage, newPos, rotatePiece, getSpecter, resetGame } from '../redux/actions/tetrisActions'

test('Should Get Piece successfully', () => {
    expect(stageReducer(undefined, {})).toEqual({
        stage : 0,
        piece : [],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    })
})

test('Should Get A Piece', () => {
    const piece = 0

    expect(stageReducer(undefined, getPiece(piece))).toEqual({
        stage : 0,
        piece : [0],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    })
})


test('Should Get A Stage', () => {
    const stage = 0
    expect(stageReducer(undefined, getStage(stage))).toEqual({
        stage : 0,
        piece : [0],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    })
})


test('Should Change The Pos', () => {

    expect(stageReducer(undefined, newPos({x: 5, y: 8}))).toEqual({
        stage : 0,
        piece : [0],
        pos: { x: 5, y : 8},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    })
})


test('Should Rotate A Piece', () => {

    const state = {
        stage : 0,
        piece : [[[0, 'L', 0], [0, 'L', 0], [0, 'L', 0]]],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    }
    
    expect(stageReducer(state, rotatePiece(undefined))).toEqual({
        stage : 0,
        piece : [[[0, 0, 0], ['L', 'L', 'L'], [0, 0, 0]]],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
        rec : 0
    })
})

test('Should Recieve A Specter', () => {
    
    const specter = Array.from(Array(20), () => new Array(12).fill([0, 'done']))

    expect(stageReducer(undefined, getSpecter(specter))).toEqual({
        stage : 0,
        piece : [0],
        pos: { x: 4, y : 0},
        specter : Array.from(Array(20), () => new Array(12).fill([0, 'done'])),
        rec : 0
    })
})

test('Should Reset The Game', () => {
    expect(stageReducer(undefined, resetGame())).toEqual({
        piece : [],
        stage : 0,
        pos: { x: 4, y : 0},
        specter :  Array.from(Array(20), () => new Array(12).fill([0, 'clear'])),
    })
})