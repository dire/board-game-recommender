import React from 'react'
import './App.css'
import Container from '@material-ui/core/Container'
import Footer from './Components/Footer'
import TopBar from './Components/TopBar'
import Wizard from './Components/Wizard/Wizard'
import Random from './Components/Random'
import Search from './Components/Search'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'wizard',
      mechanics: [],
      categories: [],
    }
  }

  componentDidMount() {
    fetch("https://blooming-temple-02451.herokuapp.com/mechanics.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            mechanics: result.mechanics
          });
        },
        (error) => {
          this.setState({
          });
        }
      )
    fetch("https://blooming-temple-02451.herokuapp.com/categories.php")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          categories: result.categories
        });
      },
      (error) => {

      }
    )

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
          main: teal[500],
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          //light: will be calculated from palette.secondary.main,
          main: blue[500],
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

    const GlobalCss = withStyles({
      // @global is handled by jss-plugin-global.
      '@global': {
        // You should target [class*="MuiButton-root"] instead if you nest themes.
        '.MuiSlider-thumb': {
          height: 20,
          width: 20,
          marginTop: "-8px",
          marginLeft: "-9px",
        },
        '.MuiSlider-rail': {
          height: 4,
        },
        '.MuiSlider-track': {
          height: 4
        },
        '.MuiSlider-mark': {
          height: 4
        }
      }
    })(() => null);

    return (
      <div>
        <ThemeProvider theme={theme}>
          <GlobalCss />
          <TopBar selectActiveView={this.changeActiveView.bind(this)} />
          <Container className="main-content" maxWidth="lg">
            <Wizard activeView={this.state.activeView} mechanics={this.state.mechanics} categories={this.state.categories} />
            <Search activeView={this.state.activeView} mechanics={this.state.mechanics} categories={this.state.categories} />
            <Random activeView={this.state.activeView} mechanics={this.state.mechanics} categories={this.state.categories} />
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
