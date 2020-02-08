import React from 'react'
import Wizard from './Wizard/Wizard'
import Search from './Search'

class MainSection extends React.Component {
  render() {
    return (
      <div>
        <Wizard />
        <Search />
      </div>
    )
  }
}

export default MainSection