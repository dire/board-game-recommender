import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`
}

export default function SelectPlayerCount(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState([1, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleChange('player-range', newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="player-range"
        getAriaValueText={valuetext}
        min={1}
        max={100}
      />
    </div>
  );
}
