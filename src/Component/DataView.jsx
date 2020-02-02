import React from 'react'
import { withStyles } from '@material-ui/core/styles'
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
    }
  
})

class DataView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products : this.props.products
        }
        console.log(this.props)
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.cardroot}>
                    <Grid container justify="center" direction="row" alignItems="flex-start" spacing={2}>

                                {this.state.products.map(
                                    el=>{
                                        console.log(el)
                                        return(
                                            <Grid item xs={6} lg={6} md={6}>
                                                <Paper className={classes.paper}>
                                                    <Card >
                                                        <CardContent>
                                                        <Typography gutterBottom variant="headline" component="h2">
                                                            julaiha
                                                        </Typography>
                                                        <Typography component="p">
                                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto possimus voluptatum numquam alias, delectus quasi recusandae illo consequuntur maxime error! Eaque ipsa architecto tempora. Ea dolorum saepe expedita magnam? Obcaecati.
                                                        </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                        </CardActions>
                                                    </Card>

                                                </Paper>
                                            </Grid>
                                        )
                                    }
                                )}

                    </Grid>

                </div>
        )
    }

}

export default withStyles(styles) (DataView)