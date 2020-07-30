import React from 'react'
import SingleResult from './SingleResult'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Random extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: true,
      isLoaded: false,
      error: null,
      randomGame: [],
      fetchUrl: '',
      isFetching: false,
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  componentDidMount() {
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
    if (this.props.activeView === 'random') {
      return (
        <Grid container justify="center">
          <Typography variant="h3">Roll the dice and find a random game</Typography>
          <SingleResult results={this.state.randomGame} isFetching={this.state.isFetching} />
        </Grid>
      )
    } else {
      return (null)
    }
  }
}

export default Random