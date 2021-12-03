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
        position: 'absolute',
        background: 'linear-gradient(0.25turn, #b5b4e5, #f9dada)',
        top: 'auto',
        bottom: '0',
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
                    <Typography variant='body1' className={classes.label}>
                        Connect with me:
                    </Typography>
                    <IconButton href={props.githubLink} target='_blank'>
                        <AiFillGithub />
                    </IconButton>
                    <IconButton href={props.linkedinLink} target='_blank'>
                        <AiFillLinkedin />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>

    )
}