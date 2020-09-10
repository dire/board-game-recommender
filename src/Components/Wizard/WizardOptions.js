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
}));

export default function ToggleButtons(props) {
  const [chosenValue, setChosenValue] = React.useState(props.options[1].value);

  const onOptionSelected = (event, newAlignment) => {
    setChosenValue(newAlignment);
    props.onSelect(props.step, event.currentTarget.value);
  };

  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            className={classes.buttonGroup}
            value={chosenValue}
            exclusive
            onChange={onOptionSelected}
            aria-label="text alignment"
          >
            {props.options.map((item) =>
              <ToggleButton onClick={onOptionSelected} value={item.value} variant="contained" color="primary" key={item.value}>{item.label}</ToggleButton>
            )}
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
}
