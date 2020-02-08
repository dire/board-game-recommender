import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

class WizardPlayerCount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.onOptionSelected = this.onOptionSelected.bind(this)
  }

  onOptionSelected(el) {
    this.props.onSelect(this.props.step, el.currentTarget.value)
  }

  render() {
    return (
      <div>
        <ButtonGroup aria-label="outlined primary button group">
          {this.props.options.map((item) =>
            <Button onClick={this.onOptionSelected} value={item.value} variant="contained" color="primary" key={item.value}>{item.label}</Button>
          )}
        </ButtonGroup>
      </div>
    )
  }
}

export default WizardPlayerCount