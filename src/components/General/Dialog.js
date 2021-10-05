import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Dialog,
    DialogContent
} from '@material-ui/core'


const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appbar: {
        background: 'linear-gradient(0.25turn, #b5b4e5, #f9dada)',
        marginBottom: '50px',
    },
    title: {
        flexGrow: 1,
        color: '#3b3142'
    },
}))

export default function InfoDialog(props) {
    const classes = useStyle()

    return (

        <Dialog open={props.open} onClose={props.close} maxWidth={props.maxSize} fullWidth>
            <DialogContent>
                <AppBar position='static' className={classes.appbar}>
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Typography variant='h6' align='center' className={classes.title}>{props.header}</Typography>
                    </Toolbar>
                </AppBar>
                {props.body}
            </DialogContent>
        </Dialog>
    )
}