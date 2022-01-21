import * as userApi from './utils/UserApi';
import Fab from '@material-ui/core/Fab';
import Favorites from './components/Favorites'
import HistoryLog from './components/HistoryLog';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import LoginComponent from './components/LoginComponent';
import React, { useState} from 'react'
import { Divider, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import FormModal from './components/FormModal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2)
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    color: theme.palette.primary
  }
}));

const RootComponent = (props) => {
  const [ localUser, setLocalUser ] = useState({})
  const [ searchList, setSearchList ] = useState([])
  const [ data, setData ] =  useState([])
  const [ favorites, setFavorites] = useState(localUser.favorites ? localUser.favorites: [])
  const [ dialogState, setDialogState] = useState(false)
  const [ settingsState, setSettingState] = useState(false)
  const [ saveValue, setSaveValue] = useState('')
  const [ settingValue, setSettingValue] = useState('')
  const [ loginState, setLoginState] = useState(false)
  const [ newUserState, setNewUserState] = useState(false)
  const [ usernameField, setUsernameField] = useState('')
  const [ passwordField, setPasswordField] = useState('')
  const [ emailField, setEmailField] = useState('')

  const classes = useStyles()
  return (
    <Grid>
      <Grid container>
        <SearchBar
          settingValue={settingValue}
          searchList={searchList}
          setSearchList={setSearchList}
          setData={setData}
          setSettingState={setSettingState}
          setLoginState={setLoginState}
        />
      </Grid>
      <Grid container>
        <Grid item className={classes.gridItem} xs={9}>
          <SearchResults
            settingValue={settingValue}
            data={data}/>
        </Grid>
        <Grid item xs={3}>
          <Grid container className={classes.gridItem}>
            <Favorites
              localUser={localUser}
              favorites={favorites}
              setData={setData}
              setFavorites={setFavorites}
            />
          </Grid>
          <Grid container className={classes.gridItem}>
            <HistoryLog
              searchList={searchList}
              setData={setData}/>
          </Grid>
        </Grid>
      </Grid>

      <Fab
        className={classes.fab}
        onClick={() => {
          setDialogState(true)
        }}>
        <Add/>
      </Fab>    

      <FormModal
        dialogState={dialogState}
        maxWidth="sm"
        fullWidth
        onDialogChange={setDialogState}
        handleSubmit={() => {
          if (localUser.username) {
            userApi.updateFavorites(localUser.username, localUser.password, [ ...favorites, saveValue], setLocalUser)
          }
          if (!favorites.includes(saveValue)) {
            setFavorites([ ...favorites, saveValue])
          }
        }}>
        <Grid>
          <Grid container justify="center">
            <Typography variant="h4">
              Add To Favorites List
            </Typography>
            <Typography variant="body">
              Add your most view stocks to your favorite list
            </Typography>
          </Grid>
          <Divider/>
          <br></br>
          <Grid container justify="center">
            <TextField
              label="Ticker Symbol"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              onChange={(event) => {
                setSaveValue(event.target.value)
              }}/>
          </Grid>
        </Grid> 
      </FormModal>

      <FormModal
        dialogState={settingsState}
        maxWidth="sm"
        fullWidth
        onDialogChange={setSettingState}
        handleSubmit={() => {}}>
        <Grid>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h4">
                App Settings
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body">
                Would you like Basic or Extensive Stock info? Basic Info gives you stock price, ceo, and market cap. Extensive info will give you earnings per share and growth rates over a period of time.
              </Typography>
            </Grid>
          </Grid>
          <Divider/>
          <br></br>
          <Grid container justify="center">
          <FormControl component="fieldset">
            <FormLabel component="legend">Setting</FormLabel>
            <RadioGroup aria-label="setting" name="setting" value={settingValue} onChange={(event) => {
              setSettingValue(event.target.value)
            }}>
              <FormControlLabel value="basic" control={<Radio />} label="Basic" />
              <FormControlLabel value="extensive" control={<Radio />} label="Extensive" />
            </RadioGroup>
          </FormControl>
          </Grid>
        </Grid> 
      </FormModal>

      <LoginComponent
        displayName='Log In/Sign Up'
        dialogState={loginState}
        localUser={localUser}
        setLocalUser={setLocalUser}
        newUserState={newUserState}
        setNewUserState={setNewUserState}
        maxWidth="sm"
        fullWidth
        onDialogChange={setLoginState}
        username={usernameField}
        password={passwordField}
        email={emailField}
        handleSubmit={() => {
          if (!favorites.includes(saveValue)) {
            setFavorites([ ...favorites, saveValue])
          }
      }}>
        <Grid>
          <Grid container justify="center">
            <Grid item classname={classes.gridItem}>
              <Typography>Username</Typography>
            </Grid>
            <Grid item classname={classes.gridItem}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => {
                  setUsernameField(event.target.value)
                }}/>
              </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item classname={classes.gridItem}>
              <Typography>Password</Typography>
            </Grid>
            <Grid item classname={classes.gridItem}>
              <TextField
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => {
                  setPasswordField(event.target.value)
                }}/>
              </Grid>
          </Grid>
          { newUserState &&
            <Grid container justify="center">
              <Grid item classname={classes.gridItem}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item classname={classes.gridItem}>
                <TextField
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => {
                    setEmailField(event.target.value)
                  }}/>
              </Grid>
          </Grid>
          }
        </Grid>
      </LoginComponent>

    </Grid>
  )
}


export default RootComponent;