import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Audiowide', cursive;
  }

  button {
    font-family: inherit; 
    font-size: 100%; 
    line-height: 1.15; 
    margin: 0; 
  }

  /**
  * Show the overflow in IE.
  * 1. Show the overflow in Edge.
  */

  button {
    overflow: visible;
  }

  /**
  * Remove the inheritance of text transform in Edge, Firefox, and IE.
  * 1. Remove the inheritance of text transform in Firefox.
  */

  button { 
    text-transform: none;
  }

  /**
  * Correct the inability to style clickable types in iOS and Safari.
  */

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button:focus {
      outline: none;
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
