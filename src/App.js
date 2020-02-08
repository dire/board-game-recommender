import React from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'
import TopBar from './Components/TopBar'
import Wizard from './Components/Wizard/Wizard'
import Search from './Components/Search'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <TopBar />
        <Container className="main-content" maxWidth="lg">
          <Wizard />
          <Search />
        </Container>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </div>
    )
  }
}

export default App
