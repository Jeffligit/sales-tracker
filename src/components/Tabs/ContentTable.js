import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingTop: '25px'
    }
}))

export default function ContentTable(props) {

    const classes = useStyles()

    const [body, setBody] = useState(props.body)

    useEffect(() => {
        setBody(props.body)
    }, [props.body])

    return (
        <div className={classes.root}>
            <Table striped bordered hover >
                <thead>
                    <tr key={'tr-head'}>
                        {props.header}
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        </div>

    )

}