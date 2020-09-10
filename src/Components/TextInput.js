import React from 'react'

class TextField extends React.Component {
  onChange(e) {
    this.props.onChange(this.props.filter, e.target.value)
  }

  render () {
    return (
      <input name={this.props.filter} onChange={this.onChange.bind(this)} ref={this.props.filter} size={this.props.size} />
    )
  }
}

export default TextField
