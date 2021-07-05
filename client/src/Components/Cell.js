
import StyledCell from './Styled/StyledCell'

const TETRO = {
    I : {tetro : [
        [0, 0, 0, 0],
        ['I', 'I', 'I', 'I'],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], color: 'rgba(255, 255, 0, 1)'},

    L : {tetro : [
        [0, 0, 'L'],
        ['L', 'L', 'L'],
        [0, 0, 0],
    ], color: 'rgba(9, 123, 0, 1)'},

    O : { tetro : [
        ['O', 'O'],
        ['O', 'O']

    ], color: 'rgba(25,27,223)'},

    J : {
        tetro : [
            ['J', 0, 0],
            ['J', 'J', 'J'],
            [0, 0, 0]
        ],
        color : 'rgba(199, 0, 0, 1)'
    },

    Z: {
        tetro : [
            [0, 'Z', 'Z'],
            ['Z', 'Z', 0],
            [0, 0, 0]
        ],
        color : 'rgba(241, 152, 17, 1)'
    },

    T: {
        tetro : [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        color: 'rgba(255, 0, 202, 1)'
    },

    S: {
        tetro: [
            ['S', 'S', 0],
            [0, 'S', 'S'],
            [0, 0, 0]
        ],
        color: 'rgba(255, 255, 255, 1)'
    }


}
const Cell = ({ value }) => {
    return (
        <StyledCell value={value} color={value !== 0 ? TETRO[value].color : 'red'}></StyledCell>
    )
}

export default Cell