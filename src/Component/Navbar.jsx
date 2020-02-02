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

const API_URL = 'http://www.mocky.io/v2/5c9105cb330000112b649af8'

class Navbar extends React.Component {

    constructor(props) {
        super()
        this.state = {
            furnitureStyles: [],
            deliveryTime: ['1 week', '2 weeks', '1 month', 'more'],
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
                    products: data.products
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
            this.setState({ query })
        } else {
            let query = { ...this.state.query }
            query.searchString = ''
            this.setState({ query })
        }
        this.handleQuery()
    }

    handleQuery = ()=>{
        var filtered_data = [...this.state.products]
        console.log(this.state.query.styles)
        if (this.state.query.styles.length > 0) {
            let newdata = filtered_data.filter((el) => { 
                return this.state.query.styles.some(arr=>el.furniture_style.includes(arr))
            })
            filtered_data = newdata
            console.log(newdata)
        }
        // if (this.state.query.delivery.length > 0) {
        //     let newdata = filtered_data.filter((el) => {
        //         return this.state.query.category.includes(el.type)
        //     })
        //     filtered_data = newdata
        // }
        if (this.state.query.searchString) {
            let newdata = filtered_data.filter((el) => {
                if (el.name) {
                    return el.name.includes(this.state.query.searchString)
                }
                else {
                    return false
                }
            })
            filtered_data = newdata
            console.log(newdata)
        }

        this.setState({ filtered_product: filtered_data })
    }

    render() {
        console.log(this.state.products)
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
                                                                    title={el}
                                                                    values={el}
                                                                    isChecked={this.state.query.delivery.includes(el)}
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
                    this.state.products ? <DataView products={this.state.products} /> : null
                }
                
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)