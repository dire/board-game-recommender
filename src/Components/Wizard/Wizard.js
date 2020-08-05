import React from 'react'
import Stepper from './WizardStepper'
import Results from '../Results'

class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: true,
      isLoaded: false,
      error: null,
      resultItems: [],
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

  }

  getGames (playerCount, playTime, theme) {
    let playerCountParameter = ''
    let categories = theme ? 'categories=' + theme : '';

    if (!playTime) {
      playTime = 9999
    }

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

    this.setState({
      isFetching: true,
    });

    fetch("https://blooming-temple-02451.herokuapp.com/?" + categories + '&lt_max_playtime=' +  time + playerCountParameter)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          resultItems: result.games,
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
    if (this.props.activeView === 'wizard') {
      return (
        <div>
          <Stepper onFinish={this.getGames.bind(this)} />
          <Results results={this.state.resultItems} isFetching={this.state.isFetching} mechanics={this.props.mechanics} categories={this.props.categories} />
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default Wizard