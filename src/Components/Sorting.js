import React from 'react'
import Select from './Select'

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_by: 'popularity',
      sort_order: 'descending',
      sortOptions: [
        {
          "id": "popularity",
          "name": "popularity"
        },
        {
          "id": "name",
          "name": "name"
        },
        {
          "id": "year_published",
          "name": "year published"
        }
      ],
      sortOrderOptions: [
        {
          "id": "ascending",
          "name": "ascending"
        },
        {
          "id": "descending",
          "name": "descending"
        }
      ]
    };
  }

  updateSort(type, sortBy) {
    if (type === "sort_order") {
      this.setState({
        sort_order: sortBy
      }, () => {
        this.props.updateSort(this.state.order_by, this.state.sort_order)
      })
    } else {
      this.setState({
        order_by: sortBy
      }, () => {
        this.props.updateSort(this.state.order_by, this.state.sort_order)
      })
    }
  };

  render () {
    const { sortOptions, sortOrderOptions } = this.state;
    return (
      <div className="sorting">
        <h2>Sort by</h2>
        <Select onChange={this.updateSort.bind(this)} options={sortOptions} filter="order_by" default="Sort by" />
        <Select onChange={this.updateSort.bind(this)} options={sortOrderOptions} filter="sort_order" default="Sort order" />
      </div>
    )
  }

}

export default Sorting