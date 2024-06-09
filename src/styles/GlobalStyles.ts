import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`



${reset}
#root{
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
}
`;

export default GlobalStyle;
