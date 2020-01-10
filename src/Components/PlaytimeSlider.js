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

export default function PlaytimeSlider(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState([0, 300]);

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 45,
      label: '45',
    },
    {
      value: 90,
      label: '90',
    },
    {
      value: 120,
      label: '120',
    },
    {
      value: 180,
      label: '180',
    },
    {
      value: 240,
      label: '240',
    },
    {
      value: 300,
      label: '300',
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleChange('playtime-range', newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="playtime-range"
        getAriaValueText={valuetext}
        min={0}
        max={300}
        marks={marks}
        step={5}
      />
    </div>
  );
}
