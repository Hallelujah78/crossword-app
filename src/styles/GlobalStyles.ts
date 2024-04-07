import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
#root{
  box-sizing: border-box !important;
}
`;

export default GlobalStyle;
