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
  }

  render() {
    let items = this.props.results
    const { error, isLoaded, mechanics, categories } = this.state;
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
                            {item.categories.map((categoryItem, index) => (
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
                ))}
              </ul>
            </div>
          </ThemeProvider>
        </div>
      )
    }
  }
}

export default Results
