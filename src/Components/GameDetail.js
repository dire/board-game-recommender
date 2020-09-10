import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: 'calc(33% - 20px);',
    },
  },
}));

export default function GameDetail(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root} py={1} px={2}>
      <Box fontWeight={700}>{props.title}</Box> {props.detail}
    </Box>
  )
}
