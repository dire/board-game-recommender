import React from 'react'
import Link from '@material-ui/core/Link';
import pkg from '../../package.json';
import { makeStyles } from '@material-ui/core/styles';

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
      <p>Made by: <Link href="https://github.com/dire">dire</Link> | Copyright © {(new Date().getFullYear())}</p>
      <p>Data is fetched from <Link href="https://www.boardgameatlas.com/">Board Game Atlas</Link> API</p>
      <p className="version">v{pkg.version}</p>
    </footer>
  )
}