import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --color-red: hsl(14, 86%, 42%);
  --color-red-dark: hsl(14, 86%, 30%);
  --color-green: hsl(159, 69%, 38%);
  --color-rose-50: hsl(20, 50%, 98%);
  --color-rose-100: hsl(13, 31%, 94%);
  --color-rose-300: hsl(14, 25%, 72%);
  --color-rose-400: hsl(7, 20%, 60%);
  --color-rose-500: hsl(12, 20%, 44%);
  --color-rose-900: hsl(14, 65%, 9%);
  --color-white: #fff;
}

@font-face {
  font-family: 'RedHatText';
  src: url('/assets/fonts/RedHatText-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;  
  font-style: normal;
}

@font-face {
  font-family: 'RedHatTextItalic';
  src: url('/assets/fonts/RedHatText-Italic-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900; 
  font-style: italic; 
}

* {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
}

html {
    font-size: 62.5%;
    box-sizing: border-box;
}

body {
    background-color: var(--color-rose-100);
    font-family: 'RedHatText';
    height: 100vh;
    padding: 2rem;
    position: relative;
 
}


`;

export default GlobalStyle;
