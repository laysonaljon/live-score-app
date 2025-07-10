import { Match } from '../types';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch('/sports.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Match[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};
