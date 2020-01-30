import styled, { css } from "styled-components";

export const Controlls = styled.div`
  ${({ theme }) => css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction:column;
    justify-content:center;

    align-items: center;
    background-color: ${theme.colors.lightBlue};
    .controls {
      display:flex;
      img {
        width: 100px;
        padding:10px;
        cursor: pointer;
      }
    }
    .album-spotlight {
      margin-top: -10%;
      margin-bottom: 5%;
      img {
        width:100%;
      }
    }
    .voice-controlls {
      position:absolute;
      bottom:5%;
      right:5%;
    }
    } */
  `}
`;

