import styled from 'styled-components'
import StyledCell from './StyledCell'
import Cell from '../Cell'




export const StyledSpecter = styled.div `
    display:grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(15vw / ${props => props.width})
    );

    grid-template-columns: repeat(${props => props.width}, 1fr);
    

    position: absolute;
    top : 50%;
    left : 80%;
    transform: translate(-50%, -50%);

    border: 2px solid #333;
    width: 15%;
    background: 111#;
`

export const Specter = ({ cells }) => {
    return (
        <StyledSpecter width={cells[0].length} height={cells.length}>
            { cells.map(dcells => dcells.map((cell, x) => <Cell key={x} value={cell[0]} />)) } 
        </StyledSpecter>
    )
}
