import React from 'react'
import Filters from './Filters'
import config from '../config.json'
import Link from '@material-ui/core/Link'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filters: [],
      fetchUrl: 'https://www.boardgameatlas.com/api/search?client_id=' + config.client_id,
      selectedFilters: '',
      isActive: false,
    };
  }
  
  getData() {
    fetch(this.state.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.games
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.getData()
  }

  getFilters(filters) {
    let selectedFilters = ''

    if (filters['mechanic'].length > 0) {
      selectedFilters = selectedFilters + '&mechanics=' + filters['mechanic']
    }

    if (filters['categories'].length > 0) {
      selectedFilters = selectedFilters + '&categories=' + filters['categories']
    }


    if (filters['gt_min_playtime'] !== null) {
      selectedFilters = selectedFilters + '&gt_min_playtime=' + filters['gt_min_playtime']
    }

    if (filters['lt_max_playtime'] !== null) {
      selectedFilters = selectedFilters + '&lt_max_playtime=' + filters['lt_max_playtime']
    }

    if (filters['min_players'] !== null) {
      selectedFilters = selectedFilters + '&min_players=' + filters['min_players']
    }

    if (filters['max_players'] !== null) {
      selectedFilters = selectedFilters + '&max_players=' + filters['max_players']
    }

    if (filters['gt_year_published'] !== null) {
      selectedFilters = selectedFilters + '&gt_year_published=' + filters['gt_year_published']
    }

    if (filters['lt_year_published'] !== null) {
      selectedFilters = selectedFilters + '&lt_year_published=' + filters['lt_year_published']
    }

    if (filters['sortBy'] !== null) {
      selectedFilters = selectedFilters + '&order_by=' + filters['sortBy']
    }

    if (filters['ascending'] !== null) {
      selectedFilters = selectedFilters + '&ascending=' + filters['ascending']
    }

    this.setState({
      filters: filters,
      selectedFilters: selectedFilters,
      fetchUrl: 'https://www.boardgameatlas.com/api/search?&limit=100' + selectedFilters + '&client_id=' + config.client_id
    }, () => {
      this.getData()
    })
  };

  render() {
    if (this.state.isActive) {
      const { error, isLoaded, items } = this.state
      const theme = createMuiTheme({
        palette: {
          primary: {
            // light: will be calculated from palette.primary.main,
            main: '#009688',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
      });
      
      if (error) {
        return <div className="system-message">Error: {error.message}</div>
      } else if (!isLoaded) {
        return <div className="system-message">Fetching games from the shelf...</div>
      } else {
        return (
          <ThemeProvider theme={theme}>
            <div className="search">
              <Filters submitFilters={this.getFilters.bind(this)} />
              <div className="results">
                <ul>
                  {items.map((item, index) => (
                    <li className="result-item" key={item.id}>
                      <div className="game-thumbnail">
                        <img className="thumbnail" src={item.thumb_url} alt={item.name} />
                      </div>
                      <div className="game-info">
                        <span className="result-number">#{index + 1}</span><h2 className="game-title">{item.name}</h2>
                        <div className="game-details">
                          <div className="game-detail">
                            <span className="detail-title">MSRP:</span> ${item.msrp}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Year:</span> {item.year_published}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Players:</span> {item.min_players} - {item.max_players}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Primary publisher:</span> {item.primary_publisher}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Designers:</span> {item.designers.join(', ')}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Playtime:</span> {item.min_playtime} - {item.max_playtime} min
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">Min age:</span> {item.min_age}
                          </div>
                          <div className="game-detail">
                            <span className="detail-title">
                              <Link href={item.url} target="_blank">
                                BGA Link
                              </Link>
                            </span>
                          </div>
                        </div>
                        <p className="game-description" dangerouslySetInnerHTML={{__html: item.description}}></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ThemeProvider>
        );
      }
    } else {
      return (null)
    }
  }
}

export default Search
