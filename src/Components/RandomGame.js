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
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import FetchingMessage from './FetchingMessage'
import GameDetail from './GameDetail'
import DescriptionIcon from '@material-ui/icons/Description'
import CategoryIcon from '@material-ui/icons/Category'
import SettingsIcon from '@material-ui/icons/Settings'

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
      return <FetchingMessage message={"Error while fetching games"} />
    }
    else if (this.state.isFetching || randomGame.length < 1) {
      return <FetchingMessage message={"Fetching games from the shelf"} />
    } else if (this.state.isLoaded) {
      let game = randomGame.games[0]
      return (
        <div>
          <Grid className="button-random" container>
            <Grid item xs={12}>
              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { this.getRandomGame() }}
                  startIcon={<DieIcon />}
                >
                  <Typography>Get random game</Typography>
                </Button>
                </Box>
            </Grid>
          </Grid>
          <div className="results results__random">
            <ul>
              <li className="result-item" key={game.id}>
                <Box className="game-thumbnail" p={2}>
                  <img className="thumbnail" src={game.thumb_url} alt={game.name} />
                </Box>
                <Box>
                  <Box textAlign={{ xs: 'center', sm: 'left', md: "left" }}>
                    <Typography display="inline" variant="h6" component="h2">{game.name}</Typography>
                  </Box>
                  <Box mt={2}>
                    <Paper>
                      <Box className="game-details" display="flex" py={1} px={2}>
                        <GameDetail title={"MSRP"} detail={"$" + game.msrp} />
                        <GameDetail title={"Year"} detail={game.year_published} />
                        <GameDetail title={"Players"} detail={game.min_players + " - " + game.max_players} />
                        {game.primary_publisher ? <GameDetail title={"Primary publisher"} detail={game.primary_publisher.name} /> : null }
                        <GameDetail title={"Designers"} detail={game.designers.join(', ')} />
                        <GameDetail title={"Playtime"} detail={game.min_playtime + " - " + game.max_playtime} />
                        <GameDetail title={"Min age"} detail={game.min_age} />
                        <GameDetail title={"Avg. rating"} detail={game.average_user_rating.toFixed(2) + " (" + game.num_user_ratings + ")"} />
                        <Box className="game-detail" py={1} px={2}>
                          <Box fontWeight={700}>
                          <Link href={game.url} target="_blank" aria-label={game.name + " page in Board Game Atlas"}>
                            BGA link
                          </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="descriptionPanel-content"
                      id="descriptionPanel-header"
                    >
                      <Box mr={1}><DescriptionIcon /></Box><Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Box dangerouslySetInnerHTML={{__html: game.description}} pr={2}></Box>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="mechanicsPanel-content"
                      id="mechanicsPanel-header"
                    >
                      <Box mr={1}><SettingsIcon /></Box><Typography>Mechanics</Typography>
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
                      <Box mr={1}><CategoryIcon /></Box><Typography>Categories</Typography>
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
                </Box>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return <FetchingMessage message={"Something just went wrong..."} />
    }
  }
}

export default RandomGame
