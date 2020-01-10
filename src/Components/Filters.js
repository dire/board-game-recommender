import React from 'react'
import Select from './Select'
import TextField from './TextInput'
import config from '../config.json'
import SelectYear from './SelectYear'
import SelectPlayerCount from './SelectPlayerCount'
import Button from '@material-ui/core/Button';

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
        'max_playtime': [],
        'gt_year_published' : [],
        'lt_year_published' : []
      }
    };
  }

  updateFilters(filter, newValue) {
    const newFilters = this.state.filters
    if (filter === 'year-range') {
      newFilters['gt_year_published'] = newValue[0] - 1
      newFilters['lt_year_published'] = newValue[1] + 1
    } else if(filter ==='player-range') {
      newFilters['min_players'] = newValue[0]
      newFilters['max_players'] = newValue[1]
    } else {
      newFilters[filter] = newValue
    }

    this.setState({
      filters: newFilters
    })
  };

  submitFilters() {
    this.props.submitFilters(this.state.filters)
  }

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
          <div className="filter">Players: <SelectPlayerCount handleChange={this.updateFilters.bind(this)} /></div>
          <div className="filter">Min playtime (minutes): <TextField onChange={this.updateFilters.bind(this)} filter="min_playtime" size="4" /></div>
          <div className="filter">Max playtime (minutes): <TextField onChange={this.updateFilters.bind(this)} filter="max_playtime" size="4" /></div>
          <div className="filter">Release year: <SelectYear handleChange={this.updateFilters.bind(this)} /></div>
          <Button variant="contained" color="primary" onClick={this.submitFilters.bind(this)}>Submit</Button>
        </form>
      )
    }
  }
}

export default Filters