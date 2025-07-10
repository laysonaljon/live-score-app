export const lightTheme = {
  background: '#f0f2f5',
  cardBackground: '#dbd9d9',
  textPrimary: '#333333',
  textSecondary: '#939393',
  textStrong: '#000000',
  border: '#e0e0e0',
  primary: '#007bff',
  white: '#ffffff',

  filterHover: '#d5d5d5',
  filterActiveBg: '#595959',
  filterActiveText: '#ffffff',
  filterGray: '#bfbfbf',
  filterInactiveCountBg: '#1e1e1e',

  indicatorLive: '#a39303',
  indicatorCancelled: '#b3616b',
  scoreText: '#212529',

  liveProgress: '#28a745',
  liveText: '#ffc107',
};

export const darkTheme = {
  background: '#1a202c',
  cardBackground: '#3d3d3d',
  textPrimary: '#e2e8f0',
  textSecondary: '#a0aec0',
  textStrong: '#cbd5e0',
  border: '#4a5568',
  primary: '#63b3ed',
  white: '#ffffff',

  filterHover: '#4a5568',
  filterActiveBg: '#a0aec0',
  filterActiveText: '#1a202c',
  filterGray: '#a0aec0',
  filterInactiveCountBg: '#475265',

  indicatorLive: '#fae41d',
  indicatorCancelled: '#b3616b',
  scoreText: '#e2e8f0',

  liveProgress: '#28a745',
  liveText: '#ffc107',
};

export type Theme = typeof lightTheme;
