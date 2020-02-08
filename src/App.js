import React from 'react'
import './App.css'
import Search from './Components/Search'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'
import Wizard from './Components/Wizard/Wizard'

function App() {
  return (
    <div>
      <Container className="main-content" maxWidth="lg">
        <h1>Board Game Recommendation Engine Mk.I</h1>
        <Wizard />
      </Container>
      <Container maxWidth="lg">
        <Footer />
      </Container>
    </div>
  );
}

export default App
