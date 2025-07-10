'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Barlow } from 'next/font/google';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { transition, flexCenter, media } from '../styles/mixins';
import ThemeToggle from '../components/ThemeToggle';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

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
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    line-height: 1.6;
    ${transition('background-color 0.3s ease, color 0.3s ease')}
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

  header {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    ${media.phonePortraitOnly`
      gap: 1rem;
    `}
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    text-align: center;

    ${media.phonePortraitOnly`
      font-size: 2rem;
    `}
  }

  main {
    width: 100%;
    max-width: 1200px;
    ${flexCenter('column')}
  }
`;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <html lang="en" className={barlow.variable}>
      <head>
        <meta name="description" content="Live football scores with dark/light mode and Barlow font." />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Live Score App</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div id="root-layout-wrapper">
            <header>
              <h1>Live Score</h1>
              <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}