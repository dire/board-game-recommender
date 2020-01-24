import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { teal } from '@material-ui/core/colors';

const OrderBySwitch = withStyles(theme => ({
  switchBase: {
    color: teal[500],
    '&$checked': {
      color: teal[500],
    },
    '&$checked + $track': {
      backgroundColor: teal[500],
    },
  },
  thumb: {},
  checked: {},
  track: {},
}))(Switch);

export default function OrderSwitch(props) {
  const [state, setState] = React.useState({ascending: false});

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    props.handleChange('ascending', event.target.checked)
  };

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Descending</Grid>
          <Grid item>
            <OrderBySwitch
              checked={state.ascending}
              onChange={handleChange('ascending')}
              value="ascending" 
            />
          </Grid>
          <Grid item>Ascending</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
