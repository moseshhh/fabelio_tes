import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core'

import CheckboxItem from './CheckboxItem'
import DataView from './DataView'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    customizeToolbar: {
        minHeight: 120,
    },
    textInput: {
        color: 'white'
    },
    formControl: {
        minWidth: 400
    },
    abc: {
        marginRight: 200
    },
    cardroot: {
        flexGrow: 1,
        maxWidth: '100%',
    },
    paper: {
        margin: 12
    }

})

const API_URL = 'https://www.mocky.io/v2/5c9105cb330000112b649af8'

class Navbar extends React.Component {

    constructor(props) {
        super()
        this.state = {
            furnitureStyles: [],
            deliveryTime: [
                {
                    title :'1 week',
                    value : "7"
                },     
                {
                    title :'2 week',
                    value : "14"
                },     
                {
                    title :'1 month',
                    value : "30"
                },     
                {
                    title :'more',
                    value : "1000"
                },     
            ],
            products: [],
            filtered_product : [],
            query: {
                styles: [],
                delivery: [],
                searchString: ''
            }
        }

        this.fetchData()
    }

    fetchData = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    furnitureStyles: data.furniture_styles,
                    products: data.products,
                    filtered_product : data.products
                })
            })
            .catch(err => console.log('error', err))
    }

    handleChange = (ev, column) => {
        if (ev.target.checked) {
            if (!this.state.query[column].includes(ev.target.value)) {
                let new_query = this.state.query
                new_query[column] = [...this.state.query[column], ev.target.value]
                this.setState({
                    query: new_query
                })
            }
        }
        else {
            let new_query = this.state.query
            new_query[column] = new_query[column].filter(el => { return el !== ev.target.value })
            this.setState({
                query: new_query
            })
        }
        this.handleQuery()
    }

    handleSearchString = (ev) => {
        if (ev.target.value) {
            let query = { ...this.state.query }
            query.searchString = ev.target.value
            this.setState({ query }, ()=> this.handleQuery())
        } else {
            let query = { ...this.state.query }
            query.searchString = ''
            this.setState({ query }, ()=>this.handleQuery())
        }
        
    }

    handleQuery = ()=>{
        var filtered_data = [...this.state.products]
        var query = this.state.query
        if (this.state.query.styles.length > 0) {
            let newdata = filtered_data.filter((el) => { 
                return this.state.query.styles.some(arr=>el.furniture_style.includes(arr))
            })
            filtered_data = newdata
        }
        if (query.delivery.length > 0) {
            let toInt = query.delivery.map((value)=>parseInt(value))
            let maxDelivTime = Math.max(...toInt)
            let newdata = filtered_data.filter((el) => {
                return parseInt(el.delivery_time) <= maxDelivTime
            })
            filtered_data = newdata
        }
        if (this.state.query.searchString) {
            let newdata = filtered_data.filter((el) => {
                    return el.name.toLowerCase().includes(this.state.query.searchString)              
            })
            filtered_data = newdata
        }
        this.setState({ filtered_product: filtered_data })
    }

    generateCard=()=>{
        return <DataView products={this.state.filtered_product}/>
    }

    render() {
        const { classes } = this.props;
        return (
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
                                            onChange={this.handleSearchString}
                                            inputProps={{ className: classes.textInput }}
                                            placeholder="Search" />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Furniture Styles
                                        </InputLabel>
                                            <Select>
                                                {
                                                    this.state.furnitureStyles.map(
                                                        (el) => {
                                                            return (
                                                                <CheckboxItem
                                                                    title={el}
                                                                    values={el}
                                                                    isChecked={this.state.query.styles.includes(el)}
                                                                    checkedItem={(ev) => this.handleChange(ev, 'styles')} />
                                                            )
                                                        }
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Delivery Time
                                        </InputLabel>
                                            <Select>
                                                {
                                                    this.state.deliveryTime.map(
                                                        (el) => {
                                                            return (
                                                                <CheckboxItem
                                                                    title={el.title}
                                                                    values={el.value}
                                                                    isChecked={this.state.query.delivery.includes(el.value)}
                                                                    checkedItem={(ev) => this.handleChange(ev, 'delivery')} />
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
                
                {
                    this.state.filtered_product.length > 0 ? this.generateCard()
                     : null
                }
                
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)