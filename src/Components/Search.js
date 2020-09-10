import React from 'react'
import Filters from './Filters'
import Results from './Results'
import FetchingMessage from './FetchingMessage'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filters: [],
      fetchUrl: 'https://blooming-temple-02451.herokuapp.com/?',
      selectedFilters: '',
      isActive: false,
      isFetching: false,
    };
  }

  getData() {
    this.setState({
      isFetching: true,
    });

    fetch(this.state.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.games,
            isFetching: false
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            isFetching: false
          });
        }
      )
  }

  componentDidMount() {
    this.getData()
  }

  getFilters(filters) {
    let selectedFilters = ''

    if (filters['mechanic'].length > 0) {
      selectedFilters = selectedFilters + '&mechanics=' + filters['mechanic']
    }

    if (filters['categories'].length > 0) {
      selectedFilters = selectedFilters + '&categories=' + filters['categories']
    }


    if (filters['gt_min_playtime'] !== null) {
      selectedFilters = selectedFilters + '&gt_min_playtime=' + filters['gt_min_playtime']
    }

    if (filters['lt_max_playtime'] !== null) {
      selectedFilters = selectedFilters + '&lt_max_playtime=' + filters['lt_max_playtime']
    }

    if (filters['min_players'] !== null) {
      selectedFilters = selectedFilters + '&min_players=' + filters['min_players']
    }

    if (filters['max_players'] !== null) {
      selectedFilters = selectedFilters + '&max_players=' + filters['max_players']
    }

    if (filters['gt_year_published'] !== null) {
      selectedFilters = selectedFilters + '&gt_year_published=' + filters['gt_year_published']
    }

    if (filters['lt_year_published'] !== null) {
      selectedFilters = selectedFilters + '&lt_year_published=' + filters['lt_year_published']
    }

    if (filters['sortBy'] !== null) {
      selectedFilters = selectedFilters + '&order_by=' + filters['sortBy']
    }

    if (filters['ascending'] !== null) {
      selectedFilters = selectedFilters + '&ascending=' + filters['ascending']
    }

    if (selectedFilters.charAt(0) === '&') {
      selectedFilters = selectedFilters.substr(1)
    }

    this.setState({
      filters: filters,
      selectedFilters: selectedFilters,
      fetchUrl: 'https://blooming-temple-02451.herokuapp.com/?' + selectedFilters
    }, () => {
      this.getData()
    })
  };

  render() {
    if (this.props.activeView === 'detailedSearch') {
      const { error, isLoaded, items, isFetching } = this.state
      if (error) {
        return <FetchingMessage message={"Error: " + error.message} />
      } else if (!isLoaded) {
        return <FetchingMessage message={"Fetching games from the shelf.."} />
      } else {
        return (
          <div className="search">
            <Filters submitFilters={this.getFilters.bind(this)} />
            <Results results={items} isFetching={isFetching} mechanics={this.props.mechanics} categories={this.props.categories} />
          </div>
        );
      }
    } else {
      return (null)
    }
  }
}

export default Search
