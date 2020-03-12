import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Link from '@material-ui/core/Link'

class WizardResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    let items = this.props.results

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

    if (this.props.isFetching) {
      return <div className="system-message">Fetching games from the shelf...</div>
    } else {
      return (
        <div>
          <ThemeProvider theme={theme}>
            <div className="results">
              <ul>
                {items && items.map((item, index) => (
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
          </ThemeProvider>
        </div>
      )
    }
  }
}

export default WizardResults