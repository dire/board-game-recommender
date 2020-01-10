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

export default function SelectYear() {
  const classes = useStyles()
  let date = new Date()
  let year = date.getFullYear()
  const [value, setValue] = React.useState([1995, year]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="year-range"
        getAriaValueText={valuetext}
        min={1980}
        max={year}
      />
    </div>
  );
}
