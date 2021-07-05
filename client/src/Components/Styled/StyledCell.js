
import styled from 'styled-components'

const StyledCell = styled.div `
        width: auto;
        border: ${props => props.value !== 0 ? "4px solid" : "0px"};
        background: ${props => props.value !== 0 ? props.color : '#111'};
    `

export default StyledCell