import React from 'react'

class TextInput extends React.Component {
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
      <input name={this.props.filter} onChange={this.onChange.bind(this)} ref={this.props.filter} size={this.props.size} />
    )
  }
}


export default TextInput