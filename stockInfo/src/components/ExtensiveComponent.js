import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2)
  },
  img: {
    padding: theme.spacing(0, 2),
    alignItems: 'right',
    justifyContent: 'right',
  }
}));

const ExtensiveComponent = props => {
  const { data } = props
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="h4">
            {data.name}
          </Typography>
        </Grid>
        <Grid container>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Price: {data.price}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Earnings Per Share: {data.eps}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Day Low: {data.dayLow}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Day High: {data.dayHigh}
              </Typography>
            </Grid>                       
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Year Low: {data.yearLow}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Year High: {data.yearHigh}
              </Typography>
            </Grid>             
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ExtensiveComponent;