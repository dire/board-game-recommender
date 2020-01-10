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

export default function SelectPlayerCount(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState([1, 4]);

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
  ];

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
        marks={marks}
      />
    </div>
  );
}
