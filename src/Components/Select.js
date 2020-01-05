import React from 'react'

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onChange(e) {
    this.props.onChange(this.props.filter, e.target.value)
  }

  render () {
    return (
      <select onChange={this.onChange.bind(this)} ref={this.props.filter}>
        <option>Select {this.props.filter}</option>
        {this.props.options.map(item => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    )
  }
}


export default Select