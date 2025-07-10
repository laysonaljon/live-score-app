'use client';

import { FC } from 'react';
import { ToggleButton } from './styles';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;
