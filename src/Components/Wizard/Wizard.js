import React from 'react'
import Stepper from './WizardStepper'

class Wizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: false,
    };
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  getGames (playerCount, playTime, theme) {
    console.log(playerCount)
    console.log(playTime)
    console.log(theme)
  }

  render() {
    return (
      <div>
        <Stepper onFinish={this.getGames.bind(this)} />
      </div>
    )
  }
}

export default Wizard