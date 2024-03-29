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
import { withStyles, withTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

const AppWrapper = (props) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            // light: will be calculated from palette.primary.main,
            main: teal[700],
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            //light: will be calculated from palette.secondary.main,
            main: cyan[700],
            // dark: will be calculated from palette.secondary.main,
            //contrastText: will be calculated to contrast with palette.secondary.main,
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
        typography: {
          fontFamily: [
            'Source Sans Pro',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      }),
    [prefersDarkMode],
  );

  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default
      },
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
      },
      '.MuiToggleButton-root' : {
        color: 'rgba(255, 255, 255, 0.38)'
      },
      '.MuiToggleButton-root.Mui-selected': {
        color: "#fff"
      },
      'fieldset': {
        padding: '20px',
        margin: '20px',
        border: '1px solid lightgray',
        borderRadius: '4px'
      },
      '.thumbnail': {
        width: 'auto',
        height: '175px'
      },
      '.MuiLink-underlineHover': {
        textDecoration: 'underline',
        color: prefersDarkMode ? teal['A100'] : teal[700]
      }
    }
  })(() => null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box bgcolor={theme.palette.background.default}>
        <GlobalCss />
        <TopBar selectActiveView={props.changeView.bind(this)} />
        <Container className="main-content" maxWidth="lg">
          <Wizard activeView={props.activeView} mechanics={props.mechanics} categories={props.categories} />
          <Search activeView={props.activeView} mechanics={props.mechanics} categories={props.categories} />
          <Random activeView={props.activeView} mechanics={props.mechanics} categories={props.categories} />
        </Container>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

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
    return (
      <AppWrapper changeView={this.changeActiveView.bind(this)} activeView={this.state.activeView} mechanics={this.state.mechanics} categories={this.state.categories}></AppWrapper>
    )
  }
}

export default withTheme(App)
