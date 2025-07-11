'use client';

import { ReactNode } from 'react';
import { Barlow } from 'next/font/google';
import { ThemeProvider } from 'styled-components'; 
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';
import GlobalStyles from '../styles/GlobalStyles'; 

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isDarkMode, toggleTheme, theme, isHydrated } = useTheme();

  return (
    <html lang="en" className={barlow.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Live football scores and match updates with real-time data from major leagues." />
        <meta name="keywords" content="football, soccer, live scores, matches, sports, real-time, results" />
        <meta name="author" content="Aljon Layson" />
        <meta property="og:title" content="Live Score App" />
        <meta property="og:description" content="Get real-time football scores and match updates" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>Live Score App - Real-time Football Scores</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            html { 
              visibility: hidden; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            html.hydrated { 
              visibility: visible; 
            }
            body { 
              margin: 0; 
              opacity: 0; 
              transition: opacity 0.3s ease;
            }
            body.loaded { 
              opacity: 1; 
            }
          `
        }} />
      </head>
      <body className={isHydrated ? 'loaded' : ''}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div id="root-layout-wrapper">
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}