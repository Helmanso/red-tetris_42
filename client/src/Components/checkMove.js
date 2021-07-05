
const ARRAY_WIDTH = 12
const ARRAY_HEIGHT = 20
const SOCKET_GET_PIECE = 22

const keep_tetro = (props) => {
 
    if (props.stage.piece.length === 0)
        return
    props.stage.piece[0].forEach((item, y) => {
        item.forEach((cell, x) => {
            if (cell !== 0)
                props.stage.stage[y + props.stage.pos.y][x + props.stage.pos.x] = [cell, "done"]
        })
    })

    props.stage.pos = { x: 4, y : -1 }
    props.stage.piece.shift()

    if (props.stage.piece.length === 0)
        props.socket.socket.emit(SOCKET_GET_PIECE, props.player.room_id)
    props.socket.socket.emit('SEND_SPECTER', props.stage.stage, props.player.room_id)
 }

export const checkMove = ( movx, movy, props) => {
    var i = 0
    var j = 0

    if (props.stage.piece.length === 0)
        return
    while (i <  props.stage.piece[0].length)
    {
        j = 0
        while(j < props.stage.piece[0][0].length)
        {
            if (props.stage.piece[0][i][j] !== 0)
            {
                if (props.stage.pos.x + movx + j < 0 || props.stage.pos.x + movx + j >= ARRAY_WIDTH)
                    return false
                else if (props.stage.pos.y + movy + i >= ARRAY_HEIGHT)
                {
                    keep_tetro(props)
                    return true
                }
                else if (props.stage.stage[props.stage.pos.y + i][props.stage.pos.x + j + movx][1] == "done")
                    return false
                else if (props.stage.stage[props.stage.pos.y + i + movy][props.stage.pos.x + j + movx][1] == "done")
                {
                    if (props.stage.pos.y - i - movy < 0)
                    {
                        props.socket.socket.emit('GAME_OVER', props.player.room_id)
                        return false
                    }
                    keep_tetro(props)
                    return true
                }
            }
            j++;
        }
        i++;
    }
}



export const checkMove2 = (rotated, movx, movy, props) => {
    var i = 0
    var j = 0

    while (i <  rotated.length)
    {
        j = 0
        while(j < rotated[0].length)
        {
            if (rotated[i][j] !== 0)
            {
                if (props.stage.pos.x + movx + j >= ARRAY_WIDTH)
                {
                    if(rotated[i][j] == 'I')
                        props.stage.pos.x -= 1
                    props.stage.pos.x -= 1
                    props.newPos(props.stage.pos)
                    return true
                }
                else if (props.stage.pos.x + movx + j < 0)
                {
                    props.stage.pos.x += 1
                    props.newPos(props.stage.pos)

                    return true
                }
                else if (props.stage.pos.y + movy + i >= ARRAY_HEIGHT)
                    return false
                else if (props.stage.stage[props.stage.pos.y + i + movy][props.stage.pos.x + j + movx][1] == "done")
                    return false
                else if (props.stage.stage[props.stage.pos.y + i + movy][props.stage.pos.x + j + movx][1] == "done")
                    return false
            }
            j++;
        }
        i++;
    }
}



