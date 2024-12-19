import { useContext } from "react";
import { ThemeContext } from './Contexts'
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';


const ChangeColor = () => {

  let theme = useContext(ThemeContext);

  let changeC = () => {
    if (theme.colorText === '#ff952c') {
      theme.setColorText('#2d7797');
    }
    else {
      theme.setColorText('#ff952c');
    }
  }



  const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

  const label = { inputProps: { 'aria-label': 'Color switch demo' } };



  return (<div style={{margin:"3px",marginTop:"5px"}}>
    <Switch {...label}  color="warning" onChange={changeC} style={{color: theme.colorText}} />
  </div>);
}

export default ChangeColor;