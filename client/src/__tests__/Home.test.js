import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import Home from '../Components/Home'


import { Provider } from 'react-redux';
import  store  from '../redux/store/store';
import {Route, MemoryRouter} from 'react-router-dom';
import { mapAction } from '../Components/Home'

describe('Testing Home Component', () => {
    const props = {
        player : {
            username : "",
            room_id : 0,
            error : false,
            leader : true,
            hasUsername : false,
            hasRoom : false,
            gameStarted : true,

        },
        looby : {
            players : [{username:"test"}]
        },

        stage : {
            stage : 0
        },
        
        newRoom: jest.fn(() => 42),
        newLooby : jest.fn((players) => players),
        getStage: jest.fn(() => 42),
        getPiece: jest.fn(() => 42),
        startGame: jest.fn(() => 42),
        newLeader: jest.fn(() => 42),
        newPos : jest.fn(() => 42),
        rotatePiece : jest.fn(() => 42),
        getSpecter : jest.fn(() => 42),
    }
    
    const renderWithRouter = (param) => {
        return render(
          <MemoryRouter initialEntries={[param]}>
            <Provider store={store}>
            <Route path=':roomid'>
              <Home props={props}/>
            </Route>
            </Provider>
          </MemoryRouter>
        )
        }
    
    it('Does not render correctly', () => {
       renderWithRouter('test[TEST]')

       const dispatch = jest.fn()
       const props = mapAction(dispatch)
       props.newPos()
       props.startGame()
       props.newLeader()
       props.rotatePiece()
       props.resetGame()
       props.newLooby()
       props.newPlayer()
       props.getStage()
       props.getPiece()
       props.getSpecter()
       props.gameOver()
       expect(dispatch).toHaveBeenCalledTimes(11)
    })

})