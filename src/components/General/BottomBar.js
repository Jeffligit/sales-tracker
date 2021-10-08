import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    IconButton,
} from '@material-ui/core'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appbar: {
        position: 'fixed',
        background: 'linear-gradient(0.25turn, #b5b4e5, #f9dada)',
        top: 'auto',
        bottom: '0'
    },
    label: {
        color: '#000000'
    }

}))
export default function Bottom(props) {

    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography variant='body' className={classes.label}>
                        Connect with me:
                    </Typography>
                    <IconButton href='https://github.com/Jeffligit' target='_blank'>
                        <AiFillGithub />
                    </IconButton>
                    <IconButton href='https://www.linkedin.com/in/jeff-li-3014/' target='_blank'>
                        <AiFillLinkedin />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>

    )
}