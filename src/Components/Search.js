import React from 'react'
import Filters from './Filters'
import Sorting from './Sorting'
import config from '../config.json'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filters: [],
      fetchUrl: 'https://www.boardgameatlas.com/api/search?client_id=' + config.client_id,
      order_by: 'popularity',
      selectedFilters: ''
    };
  }
  
  getData() {
    fetch(this.state.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.games
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

  componentDidMount() {
    this.getData()
  }

  getFilters(filters) {
    let selectedFilters = ''
    let isAscending = false

    if (this.state.order_by === 'name') {
      isAscending = true
    }

    if (filters['mechanic'].length) {
      selectedFilters = selectedFilters + '&mechanics=' + filters['mechanic']
    }

    if (filters['min_players'].length) {
      selectedFilters = selectedFilters + '&min_players=' + filters['min_players']
    }

    if (filters['max_players'].length) {
      selectedFilters = selectedFilters + '&max_players=' + filters['max_players']
    }

    if (filters['min_playtime'].length) {
      selectedFilters = selectedFilters + '&min_playtime=' + filters['min_playtime']
    }

    if (filters['max_playtime'].length) {
      selectedFilters = selectedFilters + '&max_playtime=' + filters['max_playtime']
    }

    this.setState({
      filters: filters,
      selectedFilters: selectedFilters,
      fetchUrl: 'https://www.boardgameatlas.com/api/search?&limit=100' + selectedFilters + '&client_id=' + config.client_id + '&order_by=' + this.state.order_by + '&ascending' + isAscending
    }, () => {
      this.getData()
    })
  };

  sortBy(newSortBy) {
    let isAscending = false

    if (newSortBy === 'name') {
      isAscending = true
    }

    this.setState({
      order_by: newSortBy,
      fetchUrl: 'https://www.boardgameatlas.com/api/search?&limit=100' + this.state.selectedFilters + '&client_id=' + config.client_id + '&order_by=' + newSortBy + '&ascending=' + isAscending
    }, () => {
      this.getData()
    })
  }

  render() {
    const { error, isLoaded, items } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Fetching games from the shelf...</div>
    } else {
      return (
        <div className="search">
          <Filters updateFilters={this.getFilters.bind(this)} />
          <Sorting updateSort={this.sortBy.bind(this)} />
          <div className="results">
            <ul>
              {items.map(item => (
                <li className="result-item" key={item.id}>
                  <div className="game-thumbnail">
                    <img className="thumbnail" src={item.thumb_url} alt={item.name} />
                  </div>
                  <div className="game-info">
                    <h2>{item.name}</h2>
                    <div className="game-details">
                      <div className="game-detail">
                        <span className="detail-title">Year:</span> {item.year_published}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Min age:</span> {item.min_age}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Primary publisher:</span> {item.primary_publisher}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Designers:</span> {item.designers.join(', ')}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Playtime:</span> {item.min_playtime} - {item.max_playtime} min
                      </div>
                    </div>
                    <p className="game-description" dangerouslySetInnerHTML={{__html: item.description}}></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default Search
