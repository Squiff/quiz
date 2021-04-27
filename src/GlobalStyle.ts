import { createGlobalStyle } from 'styled-components';
// import BG from './images/purple-abstract.jpg';
import BG from './images/curtains-2400.jpg';
import BGSmall from './images/curtains-900.jpg';

const GlobalStyle = createGlobalStyle`
    html {
        
        height: 100vh;

    }

    body {
        color: #FFFFFF;
        margin: 0;
        background:  linear-gradient(90deg, rgba(12,0,20,1) 0%, rgba(24,0,41,1) 35%, rgba(24,0,41,1) 60%, rgba(12,0,20,1) 100%);
        min-height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;

    }


    /* viewport unit height required to prevent background shift on chrome/safari mobile */
    .background-img {
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
        z-index:-1;
    } 

    @media (min-width: 600.01px){
        .background-img {
            background-image: url(${BG});      
        } 
    }

    @media (max-width: 600px){
        .background-img {
            background-image: url(${BGSmall});
        }
    }

    

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
