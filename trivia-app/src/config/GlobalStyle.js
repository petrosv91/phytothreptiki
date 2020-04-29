/** @format */

import { createGlobalStyle } from 'styled-components';
import { device } from './device';

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }
    html {
        font-size: 62.5%;
        /* @media ${device.tablet} {
            font-size: 55.8%;
        } */
    }
    body {
        background: #202020;
        font-size: 1.6rem;
        box-sizing: border-box;
    }
`;
