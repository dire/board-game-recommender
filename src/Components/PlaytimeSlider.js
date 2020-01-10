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

export default function PlaytimeSlider(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState([0, 300]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleChange('playtime-range', newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="playtime-range"
        getAriaValueText={valuetext}
        min={0}
        max={300}
      />
    </div>
  );
}
