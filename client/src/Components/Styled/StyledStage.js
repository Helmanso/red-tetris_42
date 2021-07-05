
import styled from 'styled-components'

const StyledStage = styled.div `
    display:grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(30vw / ${props => props.width})
    );

    grid-template-columns: repeat(${props => props.width}, 1fr);
    max-width: 30vw;

    position: absolute;
    top : 50%;
    left : 50%;
    transform: translate(-50%, -50%);

    border: 2px solid #333;
    width: 100%;
    background: 111#;
 
`


export default StyledStage