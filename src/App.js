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
      activeView: 'wizard'
    }
  }

  changeActiveView(newActiveView) {
    this.setState({
      activeView: newActiveView
    });
  }

  render() {
    return (
      <div>
        <TopBar selectActiveView={this.changeActiveView.bind(this)} />
        <Container className="main-content" maxWidth="lg">
          <Wizard activeView={this.state.activeView} />
          <Search activeView={this.state.activeView} />
        </Container>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </div>
    )
  }
}

export default App
