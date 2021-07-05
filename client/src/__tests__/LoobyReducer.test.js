import { loobyReducer } from '../redux/reducers/LoobyReducer'
import { gameOver, newLooby, startGame } from '../redux/actions/newPlayer'


test('Store should be changed to the action return', () => {
    expect(loobyReducer(undefined, {})).toEqual(
        {
            players : [],
            gameStarted : false,
            gameOver : 0
        }
    )
    
    const player = ['player', 'player2']

    expect(loobyReducer(undefined, newLooby(player))).toEqual({
        players : ['player', 'player2'],
        gameStarted : false,
        gameOver : 0
    })

 
    expect(loobyReducer(undefined, startGame(false))).toEqual({
        players : [],
        gameStarted : false,
        gameOver : 0
    })

    expect(loobyReducer(undefined, gameOver(false))).toEqual({
        players : [],
        gameStarted : false,
        gameOver : false
    })

})