import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
 ${({ theme }) => css`
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    html {
    height: 100%;
    * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
    }

    body {
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      line-height: 1.6;
      background-color: #fff;
      color: #333;
    }

    ul {
      list-style: none;
    }
 `}
`;
