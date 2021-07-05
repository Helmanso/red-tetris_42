import { fireEvent, render, screen } from '@testing-library/react' // (or /dom, /vue, ...)
import GameOver from '../Components/GameOver'
import Tetris from '../Components/Tetris'


describe('Testing GameOver Component', () => {

    it('Does not render correctly', () => {

        const props = {
            player : {
                username : "",
                leader : false,
            },
            looby : {
                players : [{username : 'test'}],
                gameOver : 2
            },
    
        }
        
        const { queryByTestId } = render(<GameOver props={props} />)
        
        expect(queryByTestId("lost-text")).toBeTruthy()

    })
    
    it('Does not render correctly', () => {

        const props = {
            player : {
                username : "",
                leader : true,
            },
            looby : {
                players : [{username : 'test'}],
                gameOver : 1
            },
            socket : {
                socket : {
                    emit : jest.fn(() => 42)
                }
            }
    
        }
        
        const { queryByTestId } = render(<GameOver props={props} />)
        const loobyButton = queryByTestId('button-over')

        fireEvent.click(loobyButton)
        expect(props.socket.socket.emit).toHaveBeenCalledTimes(1)

    })
})