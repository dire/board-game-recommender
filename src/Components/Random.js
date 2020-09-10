import React from 'react'
import RandomGame from './RandomGame'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

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
        <Grid container justify="center">
          <Box mt={3} textAlign="center">
            <Typography variant="h3">Find a random game</Typography>
            <Typography variant="h4" color="textSecondary">Let the dice decide</Typography>
          </Box>
          <RandomGame mechanics={this.props.mechanics} categories={this.props.categories} />
        </Grid>
      )
    } else {
      return (null)
    }
  }
}

export default Random