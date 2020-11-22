import React from 'react'
import Link from '@material-ui/core/Link'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import FetchingMessage from './FetchingMessage'
import GameDetail from './GameDetail'
import DescriptionIcon from '@material-ui/icons/Description'
import CategoryIcon from '@material-ui/icons/Category'
import SettingsIcon from '@material-ui/icons/Settings'

class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      mechanics: [],
      categories: [],
    };
  }

  render() {
    let items = this.props.results
    let mechanics = this.props.mechanics
    let categories = this.props.categories

    if (this.props.isFetching) {
      return <FetchingMessage message={"Fetching games from the shelf.."} />
    } else {
      return (
        <div>
          <div className="results">
            <ul>
              {items && items.map((item, index) => (
                <li className="result-item" key={item.id}>
                  <Box className="game-thumbnail" p={2}>
                    <img className="thumbnail" src={item.thumb_url} alt={item.name} />
                  </Box>
                  <Box>
                    <Box textAlign={{ xs: 'center', sm: 'left', md: "left" }}>
                      <Box pr={1} display="inline">
                        <Typography color="textSecondary" display="inline" fontSize="h6.fontSize">#{index + 1}</Typography>
                      </Box>
                      <Typography display="inline" variant="h6" component="h2">{item.name}</Typography>
                    </Box>
                    <Box mt={2}>
                      <Paper>
                        <Box className="game-details" display="flex" py={1} px={2}>
                          <GameDetail title={"MSRP"} detail={"$" + item.msrp} />
                          <GameDetail title={"Year"} detail={item.year_published} />
                          <GameDetail title={"Players"} detail={item.min_players + " - " + item.max_players} />
                          {item.primary_publisher ? <GameDetail title={"Primary publisher"} detail={item.primary_publisher.name} /> : null }
                          <GameDetail title={"Designer"} detail={item.primary_designer.name} />
                          <GameDetail title={"Playtime"} detail={item.min_playtime + " - " + item.max_playtime} />
                          <GameDetail title={"Min age"} detail={item.min_age} />
                          <GameDetail title={"Avg. rating"} detail={item.average_user_rating.toFixed(2) + " (" + item.num_user_ratings + ")"} />
                          <Box className="game-detail" py={1} px={2}>
                            <Box fontWeight={700}>
                              <Link href={item.url} target="_blank" aria-label={item.name + " page in Board Game Atlas"}>
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
                        aria-controls={"descriptionPanel-content-" + index}
                        id={"descriptionPanel-header-" + index}
                      >
                        <Box mr={1}><DescriptionIcon /></Box><Typography>Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Box dangerouslySetInnerHTML={{__html: item.description}} pr={2}></Box>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"mechanicsPanel-content-" + index}
                        id={"mechanicsPanel-header-" + index}
                      >
                        <Box mr={1}><SettingsIcon /></Box><Typography>Mechanics</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                        {item.mechanics.map((mechanicItem, index) => (
                          mechanics.map(function(mechanicObject){
                            return mechanicObject.id === mechanicItem.id ? <li key={index}>{mechanicObject.name}</li> : ''
                          })
                        ))}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"categoryPanel-content-" + index}
                        id={"categoryPanel-header-" + index}
                      >
                        <Box mr={1}><CategoryIcon /></Box><Typography>Categories</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                          {item.categories.map((categoryItem, index) => (
                            categories.map(function(categoryObject){
                              return categoryObject.id === categoryItem.id ? <li key={index}>{categoryObject.name}</li> : ''
                            })
                          ))}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default Results
