import { useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../../util/store';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { actionCreator, ActionTypes } from '../../util/action';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  fieldset: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  radioGroup: {
    textAlign: 'left',
    margin: 0,
    padding: 0,
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

const sizes = [32, 64, 128, 256];

export default function CustomizedRadios() {
  const cs = useStyles();
  const [value, setValue] = useState(32);
  const {
    dispatch 
  } = useGlobalStore()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt((event.target as HTMLInputElement).value, 10));
    console.log(event.target.value);
    try {
      const response = await fetch(`http://localhost:4321/api/v1/products/search?searchString=${event.target.value + 'gb'}&request=buyRequest`, {headers: {Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA=="}});
      dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
      const responseJson = await response.json();
      const {status, data} = responseJson;
      console.log(responseJson)
      if (!status) return;
      dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data));
      dispatch(actionCreator(ActionTypes.HOME_ALL_RES, data));
          dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data));
          dispatch(actionCreator(ActionTypes.STOP_LOADING_MORE_PAGE));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormControl component="fieldset" fullWidth={true}>
      <RadioGroup value={value} aria-label="storage" name="storage-size" onChange={handleChange}>
        {
          sizes.map((item, i) => (
            <FormControlLabel key={i} className={cs.radioGroup} value={item} control={<Radio />} label={`${item}GB`} />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}
