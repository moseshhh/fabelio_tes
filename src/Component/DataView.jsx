import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, Paper, FormControlLabel} from '@material-ui/core'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    customizeToolbar: {
        minHeight: 120,
    },
    textInput : {
        color : 'white'
    },
    formControl : {
        minWidth : 400
    },
    abc : {
        marginRight : 200
    },
    cardroot: {
        flexGrow: 1,
        maxWidth :'100%',
    },
    paper : {
        margin : 12
    },
    priceText : {
        color : "green"
    }
  
})

const colortheme = createMuiTheme({
    palette: {
      primary: { main: "#e91e63", contrastText: "#fff" },
      secondary: { main: "#03a9f4", contrastText: "#fff" }
    }
  });

class DataView extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount = ()=>{
        this.setState({
            products : this.props.products
        })
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.cardroot}>
                <Grid container justify="space-between" direction="row" alignItems="flex-start" spacing={2}>
                    {
                        this.props.products.map(
                            el=>{
                                console.log(el)
                                return(
                                    <MuiThemeProvider theme={colortheme}>
                                    <Grid item xs={6} lg={6} md={6}>
                                        <Paper className={classes.paper}>
                                            <Card >
                                                <CardContent>
                                                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                                                        <Grid item>
                                                            <Typography gutterBottom variant="headline" component="h3">
                                                                {el.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <div style={{color : "green"}}>
                                                                {/* <Typography gutterBottom color="initial" classes={classes.priceText} component="h5"> */}
                                                                    {el.price}
                                                                {/* </Typography> */}
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {el.description}
                                                    </Typography>
                                                    <div  style={{color : "blue", marginTop : '10px', marginBottom : '10px'}}>
                                                        {el.furniture_style.join(" ")}
                                                    </div>
                                                    <div  style={{color : "blue", marginTop : '10px', marginBottom : '10px', textAlign : 'right'}}>
                                                        {`${el.delivery_time} days`}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    </MuiThemeProvider>
                                )
                            }
                        )
                    }
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles) (DataView)