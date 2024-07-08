import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`



${reset}
#root{
--nav-height: 3rem;  
  box-sizing: border-box !important;
--primary-100: #8b9fc5;
--primary-200: #778fbb;
--primary-300: #607caf;
--primary-400: #4465a2;
--primary-500: #063284;
--primary-600: #052d76;
--primary-700: #04286a;
--primary-800: #03245f;
--primary-900: #022055;

html, #root, body, * {
box-sizing: border-box !important;

}

button {
    background-color: var(--primary-400);
    width: 8vw;
    height: fit-content;
    border: none;
    padding: 0.25rem 1rem;
    margin: 0.3rem;
    border-radius: 5rem;
    color: white;
    cursor: pointer;

    &:disabled {
      background-color: var(--primary-100);
      cursor: not-allowed;
    }

    transition: 0.3s linear all;
  }
}
`;

export default GlobalStyle;
