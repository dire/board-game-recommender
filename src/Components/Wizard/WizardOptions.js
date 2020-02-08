import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button'

class WizardPlayerCount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ButtonGroup aria-label="outlined primary button group">
          {this.props.options.map((item) =>
            <Button variant="contained" color="primary" key={item}>{item}</Button>
          )}
        </ButtonGroup>
      </div>
    )
  }
}

export default WizardPlayerCount