
import { useEffect } from 'react'
import { useInterval } from '../Components/hooks/useInterval'
import { RECIEVE_PIECE } from '../redux/actions/actionTypes'
import { checkMove, checkMove2 } from '../Components/checkMove'
import GameOver from './GameOver'
import Stage from './Stage'
import StyledTetris from './Styled/StyledTetris'
import StyledBackground from './Styled/StyledBackground'
import { StyledName } from './Styled/StyledGameOver'

import { Specter } from './Styled/StyledSpecter'

const Tetris = ({ props }) => {

    useEffect(() => {
        if (props.stage.piece.length === 0)
            return
        props.stage.stage = props.stage.stage.map(item => item.map(cell => cell[1] == "done" ? cell  : [0, "clear"]))
        props.stage.piece[0].forEach((item, y) => {
            item.forEach((cell, x) => {
                if (cell !== 0)
                    props.stage.stage[y + props.stage.pos.y][x + props.stage.pos.x] = [cell, "clear"]
            })
        })

        props.stage.stage.forEach((row, y) => {
            if (row.every(cell => cell[1] === "done") == true)
            {
                props.stage.stage.splice(y, 1)
                props.stage.stage.unshift(new Array(12).fill([0, 'clear']))
                props.socket.socket.emit('ADD_LINE', props.player.room_id, props.player.username)
                props.socket.socket.emit('SEND_SPECTER', props.stage.stage, props.player.room_id)
            }
            return row
        })

        props.getStage(props.stage.stage)
        
    }, [props.stage.piece, props.stage.pos, props.stage.piece[0]])
    
    useEffect(() => {

        props.socket.socket.off(RECIEVE_PIECE).on(RECIEVE_PIECE, (piece) => {
            props.getPiece(piece)
        })

        props.socket.socket.off('RECIEVE_SPECTER').on('RECIEVE_SPECTER', (specter) => {
            props.getSpecter(specter)
        })

        props.socket.socket.off('ADD_LINE').on('ADD_LINE', () => {
            props.stage.stage.push(new Array(12).fill(['L', 'done'], 0, 11).fill([0, 'clear'], 11, 12))
            props.stage.stage.splice(0, 1)
            props.socket.socket.emit('SEND_SPECTER', props.stage.stage, props.player.room_id)
            props.getStage(props.stage.stage)
        })

        props.socket.socket.off('GAME_OVER').on('GAME_OVER', (type) => {
            props.gameOver(type)
        })
        
        props.socket.socket.off('LOOBY_BACK').on('LOOBY_BACK', () => {
            props.startGame(false)
            props.resetGame()
        })
    })



    const moveTetro = ( movx, movy ) => {

       
        if (checkMove(movx, movy, props) === false)
            return

        props.stage.pos = { x: props.stage.pos.x + movx, y: props.stage.pos.y + movy }
        props.newPos(props.stage.pos)
    }


    useInterval(() => { 
        if (!props.looby.gameOver)
            moveTetro(0, 1)
    }, 350)

    const key = (keynum) => {
        if (keynum.keyCode == 37)
            moveTetro(-1, 0);
        else if (keynum.keyCode == 39)
            moveTetro(1, 0);
        else if (keynum.keyCode == 40)
            moveTetro(0, 1)
        else if (keynum.keyCode == 32)
        {
            var tmp = props.stage.piece[0][0].map((val, index) => props.stage.piece[0].map(row => row[index]).reverse())
            if (checkMove2(tmp, 0, 0, props) === false)
                return    
            props.rotatePiece(props.stage.piece)

        }
    }

    return (
        <StyledBackground role="button" tabIndex="0" onKeyDown={e => key(e)}>
            <StyledTetris>
                <Stage cells={props.stage.stage} />
            </StyledTetris>

            
                {props.looby.players.map(player => {
                    if (player.username !== props.player.username)
                        return <StyledName key={player.username}>{player.username}</StyledName>
                })}

            {props.looby.players.length == 2 ?
                <Specter cells={props.stage.specter} />
                : false}

            {props.looby.gameOver ? <GameOver props={props}></GameOver> : false}
        </StyledBackground>
        
    )
}

export default Tetris