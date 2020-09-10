import React from 'react'
import Link from '@material-ui/core/Link'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

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
      return <Paper elevation={3} className="system-message">Fetching games from the shelf...</Paper>
    } else {
      return (
        <div>
          <div className="results">
            <ul>
              {items && items.map((item, index) => (
                <li className="result-item" key={item.id}>
                  <div className="game-thumbnail">
                    <img className="thumbnail" src={item.thumb_url} alt={item.name} />
                  </div>
                  <div className="game-info">
                    <Box pr={1} display="inline">
                      <Typography color="textSecondary" display="inline" fontSize="h6.fontSize">#{index + 1}</Typography>
                    </Box>
                    <Typography display="inline" variant="h6" component="h2">{item.name}</Typography>
                    <Paper className="game-details">
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">MSRP:</Typography> ${item.msrp}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Year:</Typography> {item.year_published}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Players:</Typography> {item.min_players} - {item.max_players}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Primary publisher:</Typography> {item.primary_publisher}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Designers:</Typography> {item.designers.join(', ')}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Playtime:</Typography> {item.min_playtime} - {item.max_playtime} min
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Min age:</Typography> {item.min_age}
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">Avg. rating:</Typography> {item.average_user_rating.toFixed(2)} ({item.num_user_ratings})
                      </div>
                      <div className="game-detail">
                        <Typography variant="subtitle2" display="block">
                          <Link href={item.url} target="_blank">
                            BGA Link
                          </Link>
                        </Typography>
                      </div>
                    </Paper>
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
                          <span className="game-description" dangerouslySetInnerHTML={{__html: item.description}}></span>
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
                        aria-controls="categoryPanel-content"
                        id="categoryPanel-header"
                      >
                        <Typography>Categories</Typography>
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
                  </div>
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
