
import Cell from './Cell'
import StyledStage from './Styled/StyledStage'


const Stage = ({ cells }) => {
    return (
        <StyledStage width={cells[0].length} height={cells.length}>
            { cells.map(dcells => dcells.map((cell, x) => <Cell key={x} value={cell[0]} />)) } 
        </StyledStage>
    )
}

export default Stage