import React from 'react'
import './App.css'
import Search from './Components/Search'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
      <Container maxWidth="lg">
        <h1>Board Game Recommendation Engine Mk.I</h1>
        <Search />
      </Container>
      <Container maxWidth="lg">
        <Footer />
      </Container>
    </div>
  );
}

export default App
