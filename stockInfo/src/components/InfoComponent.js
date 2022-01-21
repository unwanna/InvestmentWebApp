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

const InfoComponent = props => {
  const { data } = props
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={10}>
        <Grid container justify="center">
          <Typography variant="h4">
            {data.companyName}
          </Typography>
        </Grid>
        <Grid container>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                CEO: {data.ceo}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Market Cap: {data.mktCap}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Symbol: {data.symbol}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Average Volume: {data.volAvg}
              </Typography>
            </Grid>                       
          </Grid>
          <Grid container>
            <Grid item xs={6} className={classes.gridItem}>
              <Typography variant="h6">
                Price: {data.price}
              </Typography>
            </Grid>            
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <img src={data.image} alt="company" height="100" width="100"/>
      </Grid>
    </Grid>
  )
}

export default InfoComponent;