import React from 'react'
import Stepper from './WizardStepper'
import Results from './WizardResults'
import config from '../../config.json'

class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: true,
      isLoaded: false,
      error: null,
      resultItems: [],
      fetchUrl: '',
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  getGames (playerCount, playTime, theme) {
    let playerCountParameter = ''
    let time = parseFloat(playTime) + 1

    switch(playerCount) {
      case '1':
        playerCountParameter = '&min_players=1'
        break;
      case '2':
        playerCountParameter = '&lt_min_players=3'
        break;
      case '3':
        playerCountParameter = '&lt_max_players=5'
        break;
      case '4':
        playerCountParameter = '&gt_max_players=4'
        break;
      default:
        playerCountParameter = '&min_players=1'
    }

    fetch("https://www.boardgameatlas.com/api/search?client_id=" + config.client_id + '&categories=' + theme + '&lt_max_playtime=' +  time + playerCountParameter)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          resultItems: result.games
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
    if (this.state.isActive) {
      return (
        <div>
          <Stepper onFinish={this.getGames.bind(this)} />
          <Results results={this.state.resultItems} />
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default Wizard