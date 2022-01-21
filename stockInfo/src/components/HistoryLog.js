import * as stockApi from '../utils/StockApi'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
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

const HistoryLog = props => {
  const { searchList, setData } = props
  const classes = useStyles()
  return ( 
    <TableContainer component={Paper}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            History Log
          </Typography>
        </Toolbar>
      </AppBar>
      <Table>
        <TableBody>
          { searchList.map((ticker, id) => {
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
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HistoryLog;