import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CheckboxItem from './CheckboxItem'
import {AppBar, Toolbar, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel} from '@material-ui/core


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

class SelectOption extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            checked : []
        }
    }

    render(){
        const { classes } = this.props;
        return(
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
                                        isChecked={this.state.checked.includes(el)}
                                        checkedItem={(ev)=>this.changeFurnitureStyle(ev, 'delivery')} />
                                )
                            }
                        )
                    }
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles) (SelectOption)