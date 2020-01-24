import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';

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

export default function Sorting (props) {
  const classes = useStyles();
  const [sort_by, setSortBy] = React.useState('popularity');

  const sortOptions = [
    {
      "id": "popularity",
      "name": "popularity"
    },
    {
      "id": "name",
      "name": "name"
    },
    {
      "id": "year_published",
      "name": "year published"
    }
  ]

  const updateSort = event => {
    setSortBy(event.target.value)
    props.updateSort(sort_by)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          id="mechanic-select"
          value={sort_by}
          onChange={updateSort}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {sortOptions.map(option => (
            <MenuItem key={option.id} value={option.id}>
              <ListItemText primary={option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}