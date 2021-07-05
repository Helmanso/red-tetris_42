
import { StyledHolder, StyledTitle, StyledList, StyledSubmit, StyledDiv } from './Styled/StyledHolders'
import { useEffect } from 'react'


import { SOCKET_GAME_STARTED, JOINED_LOOBY, RECIEVE_STAGE, RECIEVE_PIECE, SOCKET_START_GAME, LEADER_LEFT } from '../redux/actions/actionTypes'


const Looby = ({ props }) => {
    
    useEffect(() => {
        
        props.socket.socket.off(RECIEVE_STAGE).on(RECIEVE_STAGE, (stage) => {
            props.getStage(stage)
        });

        props.socket.socket.off(RECIEVE_PIECE).on(RECIEVE_PIECE, (piece) => {
            props.getPiece(piece)
        });

        props.socket.socket.off(SOCKET_GAME_STARTED).on(SOCKET_GAME_STARTED, () => {
            props.startGame(true)
        })
        props.socket.socket.off(JOINED_LOOBY).on(JOINED_LOOBY, (players) => {
            props.newLooby(players)
        })

        props.socket.socket.off(LEADER_LEFT).on(LEADER_LEFT, () => {
            props.newLeader()
        })
    })
    
    return (
        
        <StyledHolder>
            <StyledDiv> 
                {props.looby.players.map(player => 
                    <StyledList placeholder="looby-output" key={player.username}>{player.username}</StyledList>
                )}
                </StyledDiv>
                {props.looby.players.map(player => player.username === props.player.username ? 
                    player.leader ? props.player.leader = true
                    :false:false
                )}
                
                {props.player.leader ?
                    <StyledSubmit placeholder="looby-button" onClick={() => props.socket.socket.emit(SOCKET_START_GAME, props.player.room_id)}>Start</StyledSubmit>
                : false}
        </StyledHolder>
    )
}

export default Looby