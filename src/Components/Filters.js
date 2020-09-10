import React from 'react'
import SelectYear from './YearSlider'
import SelectPlayerCount from './SelectPlayerCount'
import PlaytimeSlider from './PlaytimeSlider'
import Button from '@material-ui/core/Button'
import MechanicSelect from './MechanicSelect'
import CategorySelect from './CategorySelect'
import Sorting from './Sorting'
import OrderSwitch from './OrderSwitch'
import Box from '@material-ui/core/Box'

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mechanics: [],
      categories: [],
      selectedMechanics: '',
      filters: {
        'mechanic': [],
        'categories': [],
        'min_players': [1],
        'max_players': [4],
        'gt_min_playtime': [0],
        'lt_max_playtime': [300],
        'gt_year_published' : [2000],
        'lt_year_published' : [2020],
        'ascending' : 'false',
        'sortBy' : 'popularity'
      },
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
    fetch("https://blooming-temple-02451.herokuapp.com/mechanics.php")
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
    fetch("https://blooming-temple-02451.herokuapp.com/categories.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          categories: result.categories
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
    const { error, isLoaded, mechanics, categories } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading filters...</div>
    } else {
      return (
        <form className="search-filters">
          <fieldset>
            <legend><Box px={2} fontWeight={700} fontSize="h6.fontSize">Filters</Box></legend>
            <Box py={1} className="filter"><MechanicSelect handleChange={this.updateFilters.bind(this)} options={mechanics} /></Box>
            <Box py={1} className="filter"><CategorySelect handleChange={this.updateFilters.bind(this)} options={categories} /></Box>
            <Box py={1} className="filter">Players: <SelectPlayerCount handleChange={this.updateFilters.bind(this)} /></Box>
            <Box py={1} className="filter">Playtime: <PlaytimeSlider handleChange={this.updateFilters.bind(this)} /></Box>
            <Box py={1} className="filter">Release year: <SelectYear handleChange={this.updateFilters.bind(this)} /></Box>
          </fieldset>
          <fieldset>
            <legend><Box px={2} fontWeight={700} fontSize="h6.fontSize">Sorting</Box></legend>
            <Sorting key="sorting" updateSort={this.updateFilters.bind(this)} />
            <OrderSwitch key="ordering" handleChange={this.updateFilters.bind(this)} />
          </fieldset>
          <Box textAlign="center">
            <Button variant="contained" color="primary" onClick={this.submitFilters.bind(this)}>Search!</Button>
          </Box>
        </form>
      )
    }
  }
}

export default Filters