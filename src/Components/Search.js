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

    if (filters['mechanic'].length > 0) {
      selectedFilters = selectedFilters + '&mechanics=' + filters['mechanic']
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

    console.log(filters)
    console.log(selectedFilters)

    this.setState({
      filters: filters,
      selectedFilters: selectedFilters,
      fetchUrl: 'https://www.boardgameatlas.com/api/search?&limit=100' + selectedFilters + '&client_id=' + config.client_id + '&order_by=' + this.state.order_by + '&ascending=' + isAscending
    }, () => {
      this.getData()
    })
  };

  sortBy(newSortBy, sortOrder) {
    let isAscending = true

    if (sortOrder === "ascending") {
      isAscending = true
    } else {
      isAscending = false
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
      return <div className="system-message">Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="system-message">Fetching games from the shelf...</div>
    } else {
      return (
        <div className="search">
          <Filters submitFilters={this.getFilters.bind(this)} />
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
                        <span className="detail-title">MSRP:</span> ${item.msrp}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Year:</span> {item.year_published}
                      </div>
                      <div className="game-detail">
                        <span className="detail-title">Players:</span> {item.min_players} - {item.max_players}
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
                      <div className="game-detail">
                        <span className="detail-title">Min age:</span> {item.min_age}
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
