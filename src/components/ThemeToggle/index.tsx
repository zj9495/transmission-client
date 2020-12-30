import React from 'react';
import {
  Tooltip,
  IconButton
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BrightnessAutoIcon from '@material-ui/icons/Brightness7';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../../types';
import { toggleTheme } from '../../store/actions';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useSelector((state: IAppState) => state.theme);

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={intl.formatMessage({ id: 'toggleTheme' })} enterDelay={300}>
    <IconButton
      color="inherit"
      onClick={handleChangeTheme}
      data-ga-event-category="header"
      data-ga-event-action="dark"
    >
      {theme === 'light' && 
        <Brightness4Icon />
      }
      {theme === 'dark' && 
        <Brightness7Icon />
      }
      {theme === 'auto' && 
        <BrightnessAutoIcon />
      }
    </IconButton>
  </Tooltip>
  )
}

export default ThemeToggle