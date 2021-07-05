import styled from 'styled-components'



export const StyledGameOver = styled.div `
    background : transparent;

    position : absolute;
    text-align : center;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    width: 50vw;
    height : 50vh;
`

export const StyledLooby = styled.button `
    transition-duration: 0.4s;
    position: absolute;
    top : 45%;
    left : 52%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 8%;

    border-radius: 10px;
    border : 4px solid #c2e9f2;
    background:  #c2e9f2;
    color : black;
    font-size : 17px;

    &:hover {
    background-color:  transparent; /* Green */
    color: #c2e9f2;
    opacity: 1;
}
`
export const StyledName = styled.h2 `
    position: absolute;
    top : 32%;
    left : 81%;
    transform: translate(-50%, -50%);

    color :  #c2e9f2;
    width: 100px;
    height: 100px;
    
`
