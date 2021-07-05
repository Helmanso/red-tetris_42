
import { StyledGameOver, StyledLooby } from './Styled/StyledGameOver'
import {  StyledTitle } from './Styled/StyledHolders'

const GameOver = ({ props }) => {
    return (
        <StyledGameOver > 
            {props.looby.gameOver == 2 ? <StyledTitle data-testid="lost-text">You lost</StyledTitle> : <StyledTitle data-testid="win-text">You Win</StyledTitle>}
            {props.player.leader ? <StyledLooby data-testid="button-over" onClick={() => props.socket.socket.emit('LOOBY_BACK', props.player.room_id)}>Looby</StyledLooby> : false}
        </StyledGameOver>
    )
}

export default GameOver