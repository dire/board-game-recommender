import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  systemMessage: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: "50%",
    padding: "25px",
    textAlign: "center",
    zIndex: "2"
  },
}));

export default function FetchingMessage(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.systemMessage}>
      <Typography>{props.message}</Typography>
      <Box><CircularProgress /></Box>
    </Paper>
  )
}
