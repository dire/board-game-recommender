import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';
import TuneIcon from '@material-ui/icons/Tune';
import DieIcon from '@material-ui/icons/Casino';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  menuIcon: {
    marginRight: "10px",
  },
  topBarButton: {
    '&:hover': {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    }
  }
}));

export default function TopBar(props) {
  const classes = useStyles();

  const selectActiveView = event => {
    props.selectActiveView(event.currentTarget.value)
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Board Game Recommendations
          </Typography>
          <Button className={classes.topBarButton} color="inherit" onClick={selectActiveView} value="wizard"><TimelineIcon className={classes.menuIcon} />Simple</Button>
          <Button className={classes.topBarButton} color="inherit" onClick={selectActiveView} value="detailedSearch"><TuneIcon className={classes.menuIcon} />Detailed</Button>
          <Button className={classes.topBarButton} color="inherit" onClick={selectActiveView} value="random"><DieIcon className={classes.menuIcon} />Random</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}