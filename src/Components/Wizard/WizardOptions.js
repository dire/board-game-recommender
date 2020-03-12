import React from 'react'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  buttonGroup: {
    backgroundColor: theme.palette.primary.main,
  },
  toggleButton: {
    color: 'white',
    '&:hover': {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    },
    '&.Mui-selected': {
      color: "white",
    }
  }
}));

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = React.useState('left');

  const onOptionSelected = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.onSelect(props.step, event.currentTarget.value);
  };

  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            className={classes.buttonGroup}
            value={alignment}
            exclusive
            onChange={onOptionSelected}
            aria-label="text alignment"
          >
            {props.options.map((item) =>
              <ToggleButton className={classes.toggleButton} onClick={onOptionSelected} value={item.value} variant="contained" color="primary" key={item.value}>{item.label}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
}
