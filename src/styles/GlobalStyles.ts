'use client';

import { createGlobalStyle } from 'styled-components';
import { transition, flexCenter } from './mixins';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    font-family: var(--font-barlow), 'Barlow', sans-serif;
    scroll-behavior: smooth;
    visibility: hidden; /* Prevent FOUC */
    
    &.hydrated {
      visibility: visible;
    }
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    line-height: 1.6;
    ${transition('background-color 0.3s ease, color 0.3s ease')}
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  #root-layout-wrapper {
    min-height: 100vh;
    ${flexCenter('column')}
    justify-content: flex-start;
    padding: 1rem;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    ${transition('background-color 0.3s ease, color 0.3s ease')};
  }

  main {
    width: 100%;
    ${flexCenter('column')}
  }
`;

export default GlobalStyles;