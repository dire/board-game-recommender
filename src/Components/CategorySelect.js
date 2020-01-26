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

export default function CategorySelect (props) {
  const options = props.options
  const classes = useStyles();
  const [categoryId, setCategoryId] = React.useState([]);

  const handleChange = event => {
    setCategoryId(event.target.value);
    props.handleChange('categories', event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-select-label">Categories</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          multiple
          value={categoryId}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map(category => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={categoryId.indexOf(category.id) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}