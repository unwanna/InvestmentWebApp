import * as stockApi from '../utils/StockApi'
import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = props => {
  const { settingValue, searchList, setSearchList, setData, setSettingState, setLoginState } = props
  const [currentSymbol, setCurrentSymbol] = useState('')
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Get Stock Information
          </Typography>
          <Button
            color='white'
            variant='contained'
            onClick={() => {
              setLoginState(true)
            }}> Sign Up/ Login</Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <SearchIcon/>
              </IconButton>
            </div>
            <InputBase
              placeholder="Ticker Symbol"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                setCurrentSymbol(event.target.value)
                console.warn(event.target.value)
              }}
              onBlur={() => {
                if (settingValue === 'basic') {
                  stockApi.getBasicStockInfo(currentSymbol)
                    .then(data=> {
                      setData(data)
                      if (!searchList.includes(currentSymbol) && data.status !== 404){
                        setSearchList([ ...searchList, currentSymbol])
                      }
                    })
                    .catch(err => {
                      setData([])
                    })
                } else {
                  stockApi.getFinancialStockInfo(currentSymbol)
                    .then(data=> {
                      console.warn(data)
                      setData(data)
                      if (!searchList.includes(currentSymbol) && data.status !== 404){
                        setSearchList([ ...searchList, currentSymbol])
                      }
                    })
                    .catch(err => {
                      setData([])
                    })
                }
              }}
            />
          </div>
          <div className={classes.settingIcon}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setSettingState(true)
              }}
            >
              <SettingsIcon/>
            </IconButton>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchBar;