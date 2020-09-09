import React from 'react'
import Link from '@material-ui/core/Link'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DieIcon from '@material-ui/icons/Casino';
import Grid from '@material-ui/core/Grid';

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
    this.setState({
      isFetching: true,
    });

    this.getRandomGame()
  }

  getRandomGame() {
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
    let categories = this.props.categories
    let mechanics = this.props.mechanics
    const { randomGame } = this.state

    if (this.state.error) {
      return <div className="system-message">Error happened...</div>
    }
    else if (this.state.isFetching || randomGame.length < 1) {
      return <div className="system-message">Fetching games from the shelf...</div>
    } else if (this.state.isLoaded) {
      let game = randomGame.games[0]
      return (
        <div>
          <Grid className="button-random" container>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => { this.getRandomGame() }}><DieIcon />Get random game</Button>
            </Grid>
          </Grid>
          <div className="results">
            <ul>
              <li className="result-item" key={game.id}>
                <div className="game-thumbnail">
                  <img className="thumbnail" src={game.thumb_url} alt={game.name} />
                </div>
                <div className="game-info">
                  <h2 className="game-title">{game.name}</h2>
                  <div className="game-details">
                    <div className="game-detail">
                      <span className="detail-title">MSRP:</span> ${game.msrp}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Year:</span> {game.year_published}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Players:</span> {game.min_players} - {game.max_players}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Primary publisher:</span> {game.primary_publisher}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Designers:</span> {game.designers.join(', ')}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Playtime:</span> {game.min_playtime} - {game.max_playtime} min
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Min age:</span> {game.min_age}
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">Avg. rating:</span> {game.average_user_rating.toFixed(2)} ({game.num_user_ratings})
                    </div>
                    <div className="game-detail">
                      <span className="detail-title">
                        <Link href={game.url} target="_blank">
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
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <span className="game-description" dangerouslySetInnerHTML={{__html: game.description}}></span>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="mechanicsPanel-content"
                      id="mechanicsPanel-header"
                    >
                      <Typography>Mechanics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                      {game.mechanics.map((mechanicItem, index) => (
                        mechanics.map(function(mechanicObject) {
                          return mechanicObject.id === mechanicItem.id ? <li key={index}>{mechanicObject.name}</li> : ''
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
                      <Typography>Categories</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {game.categories.map((categoryItem, index) => (
                          categories.map(function(categoryObject){
                            return categoryObject.id === categoryItem.id ? <li key={index}>{categoryObject.name}</li> : ''
                          })
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return <div className="system-message">Something just went wrong...</div>
    }
  }
}

export default RandomGame
