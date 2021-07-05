import { useEffect, useState } from 'react'
import { StyledHolder, StyledTitle, StyledInput, StyledSubmit, StyledError } from './Styled/StyledHolders'
import { JOINED_LOOBY } from '../redux/actions/actionTypes'

const Room = ({ props }) => {

    useEffect(() => {
        props.socket.socket.on(JOINED_LOOBY, (players) => {
            props.newLooby(players)

        })
    })

    const [player, setRoom] = useState(props.player)
    return (
        <StyledHolder>
            <StyledTitle>New Room</StyledTitle>
                <StyledInput onChange={(e) => player.room_id = e.target.value} placeholder="id" ></StyledInput>
                <StyledSubmit onClick={() => props.newRoom(player)} placeholder="button-room" >Create</StyledSubmit>
                {props.player.exists ?
                <StyledError>Room full or game already started</StyledError> :false}
        </StyledHolder>
    )
}

export default Room