import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function valuetext(value) {
  return `${value}`
}

export default function YearSlider(props) {
  const classes = useStyles()
  let date = new Date()
  let year = date.getFullYear()
  const [value, setValue] = React.useState([2000, year]);

  const marks = [
    {
      value: 1980,
      label: '1980',
    },
    {
      value: 1990,
      label: '1990',
    },
    {
      value: 2000,
      label: '2000',
    },
    {
      value: 2005,
      label: '2005',
    },
    {
      value: 2010,
      label: 2010,
    },
    {
      value: 2019,
      label: '2019',
    },
    {
      value: 2020,
      label: '2020',
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleChange('year-range', newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="year-range"
        getAriaValueText={valuetext}
        min={1980}
        max={year}
        marks={marks}
      />
    </div>
  );
}
