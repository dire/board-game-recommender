import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    maxWidth: '100%',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 320,
    },
  },
};

export default function MechanicSelect (props) {
  const options = props.options
  const classes = useStyles();
  const [mechanicId, setMechanicId] = React.useState([]);

  const handleChange = event => {
    setMechanicId(event.target.value);
    props.handleChange('mechanic', event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="mechanic-select-label">Game Mechanics</InputLabel>
        <Select
          labelId="mechanic-select-label"
          id="mechanic-select"
          multiple
          value={mechanicId}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map(mechanic => (
            <MenuItem key={mechanic.id} value={mechanic.id}>
              <Checkbox checked={mechanicId.indexOf(mechanic.id) > -1} />
              <ListItemText primary={mechanic.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}