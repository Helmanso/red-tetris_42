import { StyledHolder, StyledTitle, StyledInput, StyledSubmit, StyledError } from './Styled/StyledHolders'
import { connect } from 'react-redux'
import { newPlayer } from '../redux/actions/newPlayer'
import { useState } from 'react'

const Login = ({ props }) => {
    
    const [player, setPlayer] = useState(props.player)
    return (
        <StyledHolder>
            <StyledTitle>
                Username
            </StyledTitle>
            <StyledInput onChange={(e) => player.username = e.target.value} placeholder="username"></StyledInput>
                <StyledSubmit onClick={() => props.newPlayer(player)}  placeholder="Login-button">Login</StyledSubmit>
            {props.player.exists ?
                <StyledError>Username Already exists</StyledError> :false}
        </StyledHolder>
    )
}

export default Login