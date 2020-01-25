import React from 'react'
import Link from '@material-ui/core/Link';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <footer>
        <p>Made by: <Link href="https://github.com/dire">dire</Link> | Copyright © {(new Date().getFullYear())}</p>
        <p>Info of the games, popularity etc. come from Board Game Atlas API</p>
      </footer>
    )
  }
}

export default Footer