import styled from "styled-components";
import font from "../Fonts/font.woff"
import div from '../../img/div.png'

export const StyledHolder = styled.div`
    position: absolute;
    top : 50%;
    left : 50%;
    transform: translate(-50%, -50%);

    background: transparent;
    width: 50vw;
    height: 50vh;
    border-radius: 20px;
    opacity : 0.8;
`
export const StyledTitle = styled.h1 `
    position: absolute;
    top : 30%;
    left : 50%;
    transform: translate(-50%, -50%);
    text-shadow: 2px 2px 4px #000000;
    color: #c2e9f2;
    font-size : 40px;
    font-family : arial;
    border-bottom : 1px solid;
    padding-bottom : 10px;
    width:210px;
`

export const StyledInput = styled.input `

    position: absolute;
    top : 50%;
    left : 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-size : 24px;
    text-align : center;
    opacity : 0.7;
    color : #487985;
    width: 60%;
    height: 40px;
    border : 4px solid;
  &:hover{
    background-color: lightblue;
    opacity : 1;
  }
`

export const StyledSubmit = styled.button `
    transition-duration: 0.4s;
    position: absolute;
    top : 65%;
    left : 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 8%;

    border-radius: 10px;
    border : 4px solid #c2e9f2;
    background: transparent;
    color : #c2e9f2;
    font-size : 17px;

    &:hover {
    background-color:  #c2e9f2; /* Green */
    color: black;
    opacity: 1;
}
`

export const StyledList = styled.h2 `
position: relative;
  top : 30%;
  left : 51%;
  transform: translate(-50%, -50%);

  background : #1b1436;
  width :  400px;
  height : 40px; 
  text-align:center;
  padding-top : 10px;
  color : #c2e9f2;
  border : 1px solid #c2e9f2;
  border-radius : 5px;
  opacity : 0.8;
  &:hover {
    opacity: 1;
  }
  `

export const StyledDiv = styled.div `
  margin-top : 200px;
  margin-right : 40px;
`


export const StyledError = styled.div `
  background : red;
  position : relative;
  top : 80%;
  left : 20%;
  height : 4%;
  width : 60%;
  text-align:center;
  border : 4px solid;
  font-size : 17px;

`