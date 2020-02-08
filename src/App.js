import React from 'react'
import './App.css'
import Search from './Components/Search'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'
import Wizard from './Components/Wizard/Wizard'
import TopBar from './Components/TopBar'

function App() {
  return (
    <div>
      <TopBar />
      <Container className="main-content" maxWidth="lg">
        <Wizard />
      </Container>
      <Container maxWidth="lg">
        <Footer />
      </Container>
    </div>
  );
}

export default App
