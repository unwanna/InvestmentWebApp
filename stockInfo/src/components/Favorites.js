import * as stockApi from '../utils/StockApi'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppBar, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    margin: theme.spacing(2)
  }
}));

const Favorites = props => {
  const { favorites, setData, setFavorites } = props
  const classes = useStyles()
  return ( 
    <TableContainer component={Paper}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Favorites
          </Typography>
        </Toolbar>
      </AppBar>
      <Table>
        <TableBody>
          { favorites.map((ticker, id) => {
          return (
            <TableRow key={id}>
              <TableCell align="center">
                <Typography>{ticker}</Typography>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={()=>{
                    stockApi.getBasicStockInfo(ticker)
                    .then(data=> {
                      setData(data)
                    })
                    .catch(err => {
                      setData('Error')
                    })
                  }}>
                  <SearchIcon/>
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  onClick={()=>{
                    let newList = [ ...favorites]
                    newList.splice(id, 1)
                    setFavorites(newList)
                  }}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Favorites;