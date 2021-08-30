import React from 'react'
import Table from 'react-bootstrap/Table'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '50px',
        paddingRight: '50px'
    }
}))

export default function ContentTable(props) {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Table striped bordered hover >
                <thead>
                    <tr key={'tr-head'}>
                        {props.header}
                    </tr>
                </thead>
                <tbody>
                    {props.body}
                </tbody>
            </Table>
        </div>

    )

}