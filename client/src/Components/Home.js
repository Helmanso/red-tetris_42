
import StyledBackground from './Styled/StyledBackground'
import Login from './Login'
import Room from './Room'
import Looby from './Looby'
import Tetris from './Tetris'

import { startGame, newLooby, newLeader, gameOver } from '../redux/actions/newPlayer'
import { getStage, getPiece, newPos, rotatePiece, getSpecter, resetGame } from '../redux/actions/tetrisActions'


import { connect } from 'react-redux'
import { newPlayer, newRoom } from '../redux/actions/newPlayer'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Home = (props) => {
    const params = useParams().roomid
    useEffect(() => {

        if (params && !props.player.error)
        {
            const username =  params.match(/\[(.*?)\]/);
            const room_id = params.substr(0, params.indexOf('['));
            if (username && room_id)
            {
                props.player.username = username[1]
                props.player.room_id = room_id
                props.newPlayer(props.player)
                setTimeout(() => {
                    if (props.player.hasUsername == true)
                        props.newRoom(props.player)
                }, 50)
            }
        }
    })
    
    return (
        <StyledBackground>
           {!props.player.hasUsername ? <Login props={props} /> : !props.player.hasRoom ? <Room props={props} /> : !props.looby.gameStarted ?  <Looby props={props}/> : <Tetris props={props}/>}
        </StyledBackground>
    )
}

const mapProps = state => {
    return {
        player : state.player,
        socket : state.socket,
        looby : state.looby,
        stage : state.stage
    }
}

export const mapAction = dispatch => {
    return {
        newPlayer : (player) => dispatch(newPlayer(player)),
        newRoom : (player) => dispatch(newRoom(player)),
        startGame : (type) => dispatch(startGame(type)),
        newLooby : (players) => dispatch(newLooby(players)),
        getStage : (stage) => dispatch(getStage(stage)),
        getPiece : (stage) => dispatch(getPiece(stage)),
        newLeader : () => dispatch(newLeader()),
        newPos : (pos) => dispatch(newPos(pos)),
        rotatePiece : (piece) => dispatch(rotatePiece(piece)),
        getSpecter : (specter) => dispatch(getSpecter(specter)),
        gameOver : (type) => dispatch(gameOver(type)),
        resetGame : () => dispatch(resetGame()),

    }
}

export default connect(mapProps, mapAction)(Home)
