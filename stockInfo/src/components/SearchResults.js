import React from 'react';
import { AppBar, Paper, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography } from '@material-ui/core'
import InfoComponent from './InfoComponent';
import ExtensiveComponent from './ExtensiveComponent';

const SearchResults = props => {
  const { data, settingValue } = props
  return (
    <TableContainer component={Paper}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Search Results
          </Typography>
        </Toolbar>
      </AppBar>
      <TableBody>
        { data.status !== 404 ? data.map((elm, id) => {
          return (
            <TableRow key={id}>
              <TableCell>
                { settingValue === 'basic' ? 
                  <InfoComponent
                    data={elm}/>
                : <ExtensiveComponent
                    data={elm}/>
                }
              </TableCell>
            </TableRow>
          )
        }) : null}
      </TableBody>
    </TableContainer>
    
  )
}

export default SearchResults;