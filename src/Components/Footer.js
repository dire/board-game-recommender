import React from 'react'
import Link from '@material-ui/core/Link';
import pkg from '../../package.json';

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
        <p>Data is fetched from <Link href="https://www.boardgameatlas.com/">Board Game Atlas</Link> API</p>
        <p className="version">v{pkg.version}</p>
      </footer>
    )
  }
}

export default Footer