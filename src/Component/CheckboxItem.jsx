import React from 'react'
import {MenuItem, Grid, Checkbox} from '@material-ui/core'


// const CheckboxItem = (props)=>{
    // console.log(props)

class CheckboxItem extends React.Component{
    f_handleChange = (e)=>{
        this.props.checkedItem(e)
    }

    render(){
        return(
            <MenuItem>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start">
                    <Grid item>
                        <span>{this.props.title}</span>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            value={this.props.values}
                            checked={this.props.isChecked }
                            onChange={(ev)=>this.f_handleChange(ev)}
                            />
                    </Grid>
                </Grid>
            </MenuItem>
        )
    }
}

export default CheckboxItem