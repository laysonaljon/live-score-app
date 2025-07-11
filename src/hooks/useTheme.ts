'use client';

import { useState, useEffect, useCallback } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
      setIsHydrated(true);
      document.documentElement.classList.add('hydrated');
    }
  }, []); 

  useEffect(() => {
    if (isHydrated && typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isHydrated]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  return { isDarkMode, toggleTheme, theme: isDarkMode ? darkTheme : lightTheme, isHydrated };
};