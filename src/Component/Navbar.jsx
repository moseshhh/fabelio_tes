import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel} from '@material-ui/core'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import Paper from '@material-ui/core/Paper';

import CheckboxItem from './CheckboxItem'

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

const API_URL = 'http://www.mocky.io/v2/5c9105cb330000112b649af8'

class Navbar extends React.Component{

    constructor(props){
        super()
        this.state = {
            furnitureStyles : [],
            deliveryTime : ['1 week', '2 weeks', '1 month', 'more'],
            products : [],
            query : {
                styles : [],
                delivery : []
            }
        }

        this.fetchData()
    }

    fetchData = ()=>{
        console.log(API_URL)
        fetch(API_URL)
            .then((res)=>res.json())
            .then((data)=>{
                
                this.setState({
                    furnitureStyles : data.furniture_styles,
                    products : data.products
                })
            })
            .catch(err=>console.log('error', err))
    }

    changeFurnitureStyle = (ev, column)=>{
        console.log(ev.target.value)
        if(ev.target.checked){
            if(!this.state.query[column].includes(ev.target.value)){
                let new_query = this.state.query
                new_query[column] = [...this.state.query[column], ev.target.value]
                this.setState({
                    query: new_query
                })
            }
        }
        else{
            let new_query = this.state.query
            new_query[column] = new_query[column].filter(el => { return el !== ev.target.value })
            this.setState({
                query: new_query
            })
        }
    }

    render(){
        const { classes } = this.props;
        console.log(this.state)
        return(
            <div>
                <div>
                <AppBar position="static" >
                    <Toolbar className={classes.customizeToolbar}>
                        <div className={classes.root}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <TextField
                                        label="Search Furniture"
                                        color="secondary" 
                                        inputProps={{className : classes.textInput}} 
                                        placeholder="Search" />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <FormControl  className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Furniture Styles
                                        </InputLabel>
                                        <Select>
                                            {
                                                this.state.furnitureStyles.map(
                                                    (el)=>{
                                                        return(
                                                            <CheckboxItem title={el} value={el} />
                                                            // <MenuItem>
                                                            //     <Grid
                                                            //         container
                                                            //         direction="row"
                                                            //         justify="space-between"
                                                            //         alignItems="flex-start"
                                                            //     >
                                                            //         <Grid item>
                                                            //             <span className={classes.abc}>{el}</span>
                                                            //         </Grid>
                                                            //         <Grid item>
                                                            //             <Checkbox
                                                            //                 value={el}
                                                            //                 checked={this.state.query.styles.includes(el) }
                                                            //                 onChange={(ev)=>this.changeFurnitureStyle(ev, 'styles')}
                                                            //                 inputProps={{ 'aria-label': 'Checkbox A' }}
                                                            //                 />

                                                            //         </Grid>

                                                            //     </Grid>
                                                            // </MenuItem>
                                                        )
                                                    }
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs>
                                <FormControl  className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Delivery Time
                                        </InputLabel>
                                        <Select>
                                            {
                                                this.state.deliveryTime.map(
                                                    (el)=>{
                                                        return(
                                                            <CheckboxItem 
                                                                title={el}
                                                                values={el}
                                                                isChecked={this.state.query.delivery.includes(el)}
                                                                checkedItem={(ev)=>this.changeFurnitureStyle(ev, 'delivery')} />
                                                            // <MenuItem>
                                                            //     <Grid
                                                            //         container
                                                            //         direction="row"
                                                            //         justify="space-between"
                                                            //         alignItems="flex-start"
                                                            //     >
                                                            //         <Grid item>
                                                            //             <span className={classes.abc}>{el}</span>
                                                            //         </Grid>
                                                            //         <Grid item>
                                                            //             <Checkbox
                                                            //                 value={el}
                                                            //                 checked={this.state.query.delivery.includes(el) }
                                                            //                 onChange={(ev)=>this.changeFurnitureStyle(ev, 'delivery')}
                                                            //                 inputProps={{ 'aria-label': 'Checkbox A' }}
                                                            //                 />
                                                            //         </Grid>
                                                            //     </Grid>
                                                            // </MenuItem>
                                                        )
                                                    }
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    
                                </Grid>
                            </Grid>
    
                        </div>
                    </Toolbar>
                </AppBar>
                </div>
                <div className={classes.cardroot}>
                    <Grid container justify="center" direction="row" alignItems="flex-start" spacing={2}>

                                {this.state.products.map(
                                    el=>{
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
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)