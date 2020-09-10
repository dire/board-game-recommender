import React from 'react'
import Link from '@material-ui/core/Link';
import pkg from '../../package.json';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.text.secondary,
    padding: "50px  0",
    textAlign: "center"
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2">Made by: <Link href="https://github.com/dire">dire</Link> | Copyright © {(new Date().getFullYear())}</Typography>
      <Typography variant="body2">Data is fetched from <Link href="https://www.boardgameatlas.com/">Board Game Atlas</Link> API</Typography>
      <Typography variant="body2">v{pkg.version}</Typography>
    </footer>
  )
}