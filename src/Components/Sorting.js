import React from 'react'
import Select from './Select'

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_by: 'popularity',
      sortOptions: [
        {
          "id": "popularity",
          "name": "popularity"
        },
        {
          "id": "name",
          "name": "name"
        }
      ]
    };
  }

  updateSort(type, sortBy) {
    this.setState({
      order_by: sortBy
    }, () => {
      this.props.updateSort(this.state.order_by)
    })
  };

  render () {
    const { sortOptions } = this.state;
    return (
      <div className="sorting">
        <h2>Sort by</h2>
        <Select onChange={this.updateSort.bind(this)} options={sortOptions} filter="order_by" default="Sort by" />
      </div>
    )
  }

}

export default Sorting