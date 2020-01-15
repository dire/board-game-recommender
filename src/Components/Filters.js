import React from 'react'
import config from '../config.json'
import SelectYear from './YearSlider'
import SelectPlayerCount from './SelectPlayerCount'
import PlaytimeSlider from './PlaytimeSlider'
import Button from '@material-ui/core/Button'
import MechanicSelect from './MechanicSelect'

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
        'min_players': [1],
        'max_players': [4],
        'gt_min_playtime': [0],
        'lt_max_playtime': [300],
        'gt_year_published' : [2000],
        'lt_year_published' : [2020]
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
    } else if(filter ==='playtime-range') {
      newFilters['gt_min_playtime'] = newValue[0] - 1
      newFilters['lt_max_playtime'] = newValue[1] + 1
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
          console.log(result.mechanics)
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
          <div className="filter"><MechanicSelect handleChange={this.updateFilters.bind(this)} options={mechanics} /></div>
          <div className="filter">Players: <SelectPlayerCount handleChange={this.updateFilters.bind(this)} /></div>
          <div className="filter">Playtime: <PlaytimeSlider handleChange={this.updateFilters.bind(this)} /></div>
          <div className="filter">Release year: <SelectYear handleChange={this.updateFilters.bind(this)} /></div>
          <Button variant="contained" color="primary" onClick={this.submitFilters.bind(this)}>Submit</Button>
        </form>
      )
    }
  }
}

export default Filters