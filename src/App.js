import React from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'
import TopBar from './Components/TopBar'
import Wizard from './Components/Wizard/Wizard'
import Search from './Components/Search'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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
    const theme = createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#009688',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#0066ff',
          main: '#0044ff',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
      },
    });

    return (
      <div>
        <ThemeProvider theme={theme}>
          <TopBar selectActiveView={this.changeActiveView.bind(this)} />
          <Container className="main-content" maxWidth="lg">
            <Wizard activeView={this.state.activeView} />
            <Search activeView={this.state.activeView} />
          </Container>
          <Container maxWidth="lg">
            <Footer />
          </Container>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
