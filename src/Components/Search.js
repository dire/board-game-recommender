import React from 'react'
import Filters from './Filters'
import config from '../config.json'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filters: [],
      fetchUrl: 'https://www.boardgameatlas.com/api/search?client_id=' + config.client_id
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

    if (filters['mechanic']) {
      selectedFilters = selectedFilters + 'mechanics=' + filters['mechanic']
    }

    this.setState({
      filters: filters,
      fetchUrl: 'https://www.boardgameatlas.com/api/search?' + selectedFilters + '&limit=100&client_id=' + config_client_id
    }, () => {
      this.getData()
    })
  };

  render() {
    const { error, isLoaded, items } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Fetching games from the shelf...</div>
    } else {
      return (
        <div className="search">
          <Filters updateFilters={this.getFilters.bind(this)} filters={this.state.filters} />
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p dangerouslySetInnerHTML={{__html: item.description}}></p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Search
