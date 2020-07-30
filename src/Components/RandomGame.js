import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Link from '@material-ui/core/Link'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

class RandomGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      mechanics: [],
      categories: [],
      randomGame: [],
    };
  }

  componentDidMount() {
    fetch("https://blooming-temple-02451.herokuapp.com/mechanics.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            mechanics: result.mechanics
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    fetch("https://blooming-temple-02451.herokuapp.com/categories.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          categories: result.categories
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    this.setState({
      isFetching: true,
    });

    fetch("https://blooming-temple-02451.herokuapp.com/?random=true")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          randomGame: result,
          isFetching: false,
        });
      },
      (error) => {
        this.setState({
          isLoaded: false,
          error,
          isFetching: false,
        });
      }
    )
  }

  render() {
    const { error, isLoaded, mechanics, categories, randomGame } = this.state;
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

    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    }));

    if (this.state.isFetching || randomGame.length < 1) {
      return <div className="system-message">Fetching games from the shelf...</div>
    } else {
      console.log(randomGame);
      return (
        <div>
          <ThemeProvider theme={theme}>
            <div className="results">
              <ul>
                <li className="result-item" key={randomGame.game.id}>
                  <div className="game-thumbnail">
                    <img className="thumbnail" src={randomGame.game.thumb_url} alt={randomGame.game.name} />
                  </div>
                  <div className="game-info">
                    <h2 className="game-title">{randomGame.game.name}</h2>
                    <div className="game-details">
                      <div className="game-detail">
                        <span className="detail-title">MSRP:</span> ${randomGame.game.msrp}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Year:</span> {randomGame.game.year_published}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Players:</span> {randomGame.game.min_players} - {randomGame.game.max_players}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Primary publisher:</span> {randomGame.game.primary_publisher}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Designers:</span> {randomGame.game.designers.join(', ')}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Playtime:</span> {randomGame.game.min_playtime} - {randomGame.game.max_playtime} min
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Min age:</span> {randomGame.game.min_age}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Avg. rating:</span> {randomGame.game.average_user_rating.toFixed(2)} ({randomGame.game.num_user_ratings})
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">
                          <Link href={randomGame.game.url} target="_blank">
                            BGA Link
                          </Link>
                        </span>
                      </div>
                    </div>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="descriptionPanel-content"
                        id="descriptionPanel-header"
                      >
                        <Typography className={classes.heading}>Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <span className="game-description" dangerouslySetInnerHTML={{__html: randomGame.game.description}}></span>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="mechanicsPanel-content"
                        id="mechanicsPanel-header"
                      >
                        <Typography className={classes.heading}>Mechanics</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                        {randomGame.game.mechanics.map((mechanicItem, index) => (
                          mechanics.map(function(mechanicObject){
                            if (mechanicObject.id === mechanicItem.id) {
                              return <li key={index}>{mechanicObject.name}</li>
                            }
                          })
                        ))}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="categoryPanel-content"
                        id="categoryPanel-header"
                      >
                        <Typography className={classes.heading}>Categories</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                          {randomGame.game.categories.map((categoryItem, index) => (
                            categories.map(function(categoryObject){
                              if (categoryObject.id === categoryItem.id) {
                                return <li key={index}>{categoryObject.name}</li>
                              }
                            })
                          ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </li>
              </ul>
            </div>
          </ThemeProvider>
        </div>
      )
    }
  }
}

export default RandomGame
