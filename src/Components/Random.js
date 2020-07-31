import React from 'react'
import RandomGame from './RandomGame'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Random extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: true,
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    if (this.props.activeView === 'random') {
      return (
        <Grid className="random-container" container justify="center">
          <Grid container justify="center">
            <Typography variant="h3">Find a random game</Typography>
          </Grid>
          <Grid container justify="center">
            <Typography variant="h4">Let the dice decide</Typography>
          </Grid>
          <RandomGame />
        </Grid>
      )
    } else {
      return (null)
    }
  }
}

export default Random