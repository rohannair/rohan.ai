import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'Lora', serif;
    box-sizing: border-box;
  }

  body {
    overflow-y: scroll;
    font-size: 16px;
    line-height: 1.54;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Exo', sans-serif;
  }
`;

export default GlobalStyle;
