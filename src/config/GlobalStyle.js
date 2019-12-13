import { createGlobalStyle } from 'styled-components';
import defaultTheme from './themes';
const GlobalStyle = createGlobalStyle`
*{
    box-sizing:inherit;
    margin:0;
    padding:0;
}
html {
  height: 100% ;
  background-color: ${defaultTheme.primary};   
}
body{
    background-color: ${defaultTheme.primary};   
    min-height:100%;
    box-sizing:border-box;
    color:${defaultTheme.text};
    font-family:"Roboto" ;
  }
}
  
`;

export default GlobalStyle;
