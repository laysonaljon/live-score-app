import { Match } from '../types';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch('/sports.json');
    if (!response.ok) {
      console.error(`[fetchMatches] HTTP error: ${response.status} ${response.statusText}`);
      return [];
    }

    const text = await response.text();

    try {
      const data: Match[] = JSON.parse(text);
      return data;
    } catch (jsonError) {
      console.error('[fetchMatches] Failed to parse JSON:', jsonError);
      console.warn('[fetchMatches] Received invalid JSON:', text);
      return [];
    }

  } catch (networkError) {
    console.error('[fetchMatches] Network or fetch error:', networkError);
    return [];
  }
};
