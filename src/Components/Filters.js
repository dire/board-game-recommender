import React from 'react'
import Select from './Select'
import config from '../config.json'

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mechanics: [],
      selectedMechanics: '',
      filters: {
        'mechanic': [],
        'minPlayers': [],
        'maxPlayers': [],
        'minPlaytime': [],
        'maxPlaytime': []
      }
    };
  }

  updateFilters(filter, newValue) {
    const newFilters = this.state.filters
    newFilters[filter] = newValue

    this.setState({
      filters: newFilters
    })

    this.props.updateFilters(this.state.filters)
  };

  componentDidMount() {
    fetch("https://www.boardgameatlas.com/api/game/mechanics?client_id" + config.client_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            mechanics: result.mechanics
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

  render () {
    const { error, isLoaded, mechanics } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Fetching games from the shelf...</div>
    } else {
      return (
        <form className="search-filters">
          <h2>Filters</h2>
          <Select onChange={this.updateFilters.bind(this)} options={mechanics} filter="mechanic" />
        </form>
      )
    }
  }
}

export default Filters