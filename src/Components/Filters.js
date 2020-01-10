import React from 'react'
import Select from './Select'
import TextField from './TextInput'
import config from '../config.json'
import SelectYear from './SelectYear'

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
        'min_players': [],
        'max_players': [],
        'min_playtime': [],
        'max_playtime': []
      }
    };
  }

  updateFilters(filter, newValue) {
    const newFilters = this.state.filters
    newFilters[filter] = newValue

    this.setState({
      filters: newFilters
    }, () => {
      this.props.updateFilters(this.state.filters)
    })
  };

  componentDidMount() {
    fetch("https://www.boardgameatlas.com/api/game/mechanics?client_id=" + config.client_id)
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
          <div className="filter"><Select onChange={this.updateFilters.bind(this)} options={mechanics} filter="mechanic" default="Choose mechanic" /></div>
          <div className="filter">Min players: <TextField onChange={this.updateFilters.bind(this)} filter="min_players" size="4" /></div>
          <div className="filter">Max players: <TextField onChange={this.updateFilters.bind(this)} filter="max_players" size="4" /></div>
          <div className="filter">Min playtime (minutes): <TextField onChange={this.updateFilters.bind(this)} filter="min_playtime" size="4" /></div>
          <div className="filter">Max playtime (minutes): <TextField onChange={this.updateFilters.bind(this)} filter="max_playtime" size="4" /></div>
          <div className="filter">Release year: <SelectYear /></div>
        </form>
      )
    }
  }
}

export default Filters