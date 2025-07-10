import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from 'styled-components'
import MatchCard from './index'
import { Match } from '../../types'
import { Theme } from '../../styles/theme'

jest.mock('../../utils/formatters', () => ({
  formatTimestamp: jest.fn((ts) => `Formatted: ${ts}`),
  getStatusLabel: jest.fn((status) => `Label: ${status}`),
}))

const mockTheme: Theme = {
  background: '#fff',
  cardBackground: '#f4f4f4',
  textPrimary: '#000',
  textSecondary: '#666',
  textStrong: '#111',
  border: '#ccc',
  primary: '#0070f3',
  white: '#ffffff',

  filterHover: '#eaeaea',
  filterActiveBg: '#222222',
  filterActiveText: '#ffffff',
  filterGray: '#bfbfbf',
  filterInactiveCountBg: '#1e1e1e',

  indicatorLive: '#ffff00',
  indicatorCancelled: '#b3616b',
  scoreText: '#212529',

  liveProgress: '#28a745',
  liveText: '#ffc107',
}

const renderWithTheme = (match: Match) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      <MatchCard match={match} />
    </ThemeProvider>
  )
}

describe('MatchCard', () => {
  const baseMatch: Match = {
    id: '1',
    name: 'Test Match',
    competitionId: '101',
    competition: 'Premier League',
    countryId: '44',
    country: 'england',
    timestamp: 1234567890,
    date: '2023-01-01',
    time: '20:00',
    status: { type: 'finished', code: 3 },
    round: { round: 1 },
    homeTeam: {
      id: 1,
      name: 'Man Utd',
      slug: 'man-utd',
      gender: 'male',
      subTeams: [],
    },
    awayTeam: {
      id: 2,
      name: 'Liverpool',
      slug: 'liverpool',
      gender: 'male',
      subTeams: [],
    },
    homeScore: { current: 2 },
    awayScore: { current: 1 },
    liveStatus: '90',
  }

  it('renders team names and competition', () => {
    renderWithTheme(baseMatch)
    expect(screen.getByText('Man Utd')).toBeInTheDocument()
    expect(screen.getByText('Liverpool')).toBeInTheDocument()
    expect(screen.getByText('Premier League')).toBeInTheDocument()
  })

  it('displays uppercase country', () => {
    renderWithTheme(baseMatch)
    expect(screen.getByText('ENGLAND')).toBeInTheDocument()
  })

  it('displays FT for finished match', () => {
    renderWithTheme(baseMatch)
    expect(screen.getByText('FT')).toBeInTheDocument()
  })

  it('shows formatted time for notstarted match', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'notstarted', code: 1 },
    }
    renderWithTheme(match)
    expect(screen.getByText(/Formatted: 1234567890/)).toBeInTheDocument()
  })

  it('shows live minute when in progress', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'inprogress', code: 2 },
      liveStatus: '45',
    }
    renderWithTheme(match)
    expect(screen.getByText("45'")).toBeInTheDocument()
  })

  it('shows HT when liveStatus is HT', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'inprogress', code: 2 },
      liveStatus: 'HT',
    }
    renderWithTheme(match)
    expect(screen.getByText('HT')).toBeInTheDocument()
  })

  it('renders scores as complete score display', () => {
    renderWithTheme(baseMatch)
    // Since scores are rendered as "2 - 1" in a single element with styled spans,
    // we need to check for the complete score display
    expect(screen.getByText('2', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('1', { exact: false })).toBeInTheDocument()
    // Or test the complete score pattern
    const scoreElement = screen.getByText((content, element) => {
      return element?.textContent === '2-1'
    })
    expect(scoreElement).toBeInTheDocument()
  })

  it('shows 0-0 for not started match with no scores', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'notstarted', code: 1 },
      homeScore: undefined,
      awayScore: undefined,
    }
    renderWithTheme(match)
    // Test for the complete score display showing "0-0"
    const scoreElement = screen.getByText((content, element) => {
      return element?.textContent === '0-0'
    })
    expect(scoreElement).toBeInTheDocument()
  })

  it('shows dashes when scores are missing during in-progress match', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'inprogress', code: 2 },
      homeScore: undefined,
      awayScore: undefined,
    }
    renderWithTheme(match)
    // Test for the complete score display showing "---" (three dashes concatenated)
    const scoreElement = screen.getByText((content, element) => {
      return element?.textContent === '---'
    })
    expect(scoreElement).toBeInTheDocument()
  })

  it('does not render central status for canceled match', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'canceled', code: 4 },
      liveStatus: '',
    }
    renderWithTheme(match)
    expect(screen.queryByText('FT')).not.toBeInTheDocument()
    expect(screen.queryByText("45'")).not.toBeInTheDocument()
    expect(screen.queryByText('HT')).not.toBeInTheDocument()
  })

  it('renders central status for finished match', () => {
    renderWithTheme(baseMatch)
    expect(screen.getByText('FT')).toBeInTheDocument()
  })

  it('renders central status for in-progress match', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'inprogress', code: 2 },
      liveStatus: '75',
    }
    renderWithTheme(match)
    expect(screen.getByText("75'")).toBeInTheDocument()
  })

  it('handles notstarted match with existing scores', () => {
    const match: Match = {
      ...baseMatch,
      status: { type: 'notstarted', code: 1 },
      homeScore: { current: 3 },
      awayScore: { current: 2 },
    }
    renderWithTheme(match)
    // Based on the component logic, notstarted matches show 0-0 regardless of existing scores
    const scoreElement = screen.getByText((content, element) => {
      return element?.textContent === '0-0'
    })
    expect(scoreElement).toBeInTheDocument()
  })
})