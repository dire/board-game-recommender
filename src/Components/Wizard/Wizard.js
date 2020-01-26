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

  render() {
    return (
      <div>
        <Stepper />
      </div>
    )
  }
}

export default Wizard