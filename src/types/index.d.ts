export interface Match {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  countryId: string;
  country: string;
  timestamp: number;
  date: string;
  time: string;
  status: {
    code: number;
    type: 'finished' | 'inprogress' | 'notstarted' | 'canceled';
  };
  round: {
    round: number;
    name?: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: Score; 
  awayScore?: Score;
  liveStatus: string;
}

export interface Team {
  id: number;
  name: string;
  slug: string;
  gender: string | null;
  subTeams: string[];
}

export interface Score {
  current?: number;
  period1?: number;
  normaltime?: number;
}

export type FilterType = 'All' | 'Result' | 'Live' | 'Upcoming';

export interface Filter {
  label: FilterType;
  value: 'all' | 'finished' | 'inprogress' | 'notstarted';
  count: number;
}
