import React from 'react'
import Link from '@material-ui/core/Link'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    }));

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
                        <span className="detail-title">Avg. rating:</span> {item.average_user_rating.toFixed(2)} ({item.num_user_ratings})
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">
                          <Link href={item.url} target="_blank">
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
                        <Typography className={classes.heading}>Mechanics</Typography>
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
                        <Typography className={classes.heading}>Categories</Typography>
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
