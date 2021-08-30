import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
} from '@material-ui/core'
import { FcDownload, FcUpload, FcInfo } from 'react-icons/fc'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appbar: {
        position: 'static',
        background: 'linear-gradient(0.25turn, #b5b4e5, #f9dada)'
    },
    button: {
        marginRight: '10px'
    },
    title: {
        color: '#3b3142'
    }

}))
export default function TopBar(props) {

    const classes = useStyles();

    function download() {
        const element = document.createElement("a")
        const file = new Blob([props.data()], {type: 'text/csv;charset=utf-8'})
        element.href = URL.createObjectURL(file)
        element.download = 'salesData.csv'
        document.body.appendChild(element)
        element.click()
        element.remove()
    }

    function upload() {
        const element = document.createElement("input")
        element.type = "file"
        element.multiple = false
        element.accept = ".csv"
        element.onchange = (evt) => {props.read(evt.target.files[0])}
        element.click()
        console.log('uploading')
    }

    


    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography variant='h5' className={classes.title}>
                        Sales Tracker
                    </Typography>
                    <div className={classes.grow} />
                    {/* upload csv file that contains user's data*/}
                    <Button
                        variant='outlined'
                        color='default'
                        startIcon={<FcUpload />}
                        className={classes.button}
                        onClick={() => upload()}
                    >
                        Upload
                    </Button>
                    {/* converts the table of all three tabs into a csv and downloads */}
                    <Button
                        variant='outlined'
                        color='default'
                        startIcon={<FcDownload />}
                        onClick={() => download()}
                    >
                        Download
                    </Button>
                    {/* This is the info icon button that when clicked displays a dialog explaining the upload and download functions */}
                    <IconButton onClick={props.infoOpen}>
                        <FcInfo />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>

    )
}