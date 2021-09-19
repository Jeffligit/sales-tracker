import React, { useState } from 'react'
import AddBtn from '../AddBtn'
import '../../App.css'
import ContentTable from '../ContentTable'
import {
    makeStyles,
    TextField,
    Grid,
    Typography
} from '@material-ui/core'
import Button from 'react-bootstrap/esm/Button'
import Dialog from '../Dialog'

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    appbar: {
        background: 'linear-gradient(0.25turn, #b5b4e5, #f9dada)',
        marginBottom: '50px',
    },
    title: {
        flexGrow: 1,
        color: '#3b3142'
    },
    itemBtns: {
        marginRight: '10px'
    }
}))


export default function Expense(props) {
    const classes = useStyle()

    const headerRow = props.currExpense !== null && props.currExpense !== undefined ? (props.currExpense[0].map((colTitle, i) => {
        return <th key={i}>{colTitle === '' ? <AddBtn btnFunc={handleOpenAddNewItemDialog} /> : colTitle}</th>
    })) : <></>

    const bodyRows = props.currExpense !== null && props.currExpense !== undefined ? (props.currExpense.map((row, i) => {
        if (i !== 0) {
            let item = Array(5)
            return <tr key={'tr-' + i}>{props.currExpense[i].map((content, j) => {
                item[j] = content
                return <td key={'td-' + j}>{content}</td>
            })}
                <td>
                    <Button variant='danger' onClick={() => { props.removeExpense(parseInt(item[0])) }} className={classes.itemBtns}>
                        Remove
                    </Button>
                </td>
            </tr>
        } else {
            return <React.Fragment key={'empty-'+i}></React.Fragment>
        }
    })) : <React.Fragment key={'empty'}></React.Fragment>

    const [newItemOpen, setNewItemOpen] = useState(false)
    const [productName, setProductName] = useState('')
    const [date, setDate] = useState('Unknown')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productNameError, setProductNameError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    // const [labels, setLabels] = useState([])

    function handleOpenAddNewItemDialog() {
        setNewItemOpen(true)
    }



    function handleCloseAddNewItemDialog() {
        setProductName('')
        setDate('Unknown')
        setPrice('')
        setQuantity('')
        setProductNameError(false)
        setPriceError(false)
        setQuantityError(false)
        setNewItemOpen(false)
    }

    function handleProductNameChange(event) {
        setProductName(event.target.value)
    }

    function handlePriceChange(event) {
        setPrice(event.target.value)
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value)
    }

    function handleDateChange(event) {
        let stringDate = event.target.value.split('-')

        let revisedDate = stringDate[1] + '/' + stringDate[2] + '/' + stringDate[0]

        if (stringDate[1] === undefined) {
            setDate('Unknown')
            return
        }

        setDate(revisedDate)
    }

    function addNewItem() {
        let errored = false
        if (productName === '') {
            setProductNameError(true)
            errored = true
        }
        if (price === '') {
            setPriceError(true)
            errored = true
        }
        if (quantity === '') {
            setQuantityError(true)
            errored = true
        }

        if (errored) {
            return
        } else {
            props.addNewExpense(false, date, productName, price, quantity)
        }
    }

    return (
        <div>
            {/* This is the table for users to see their inventory */}
            <ContentTable header={headerRow} body={bodyRows} />
            <Dialog
                open={newItemOpen}
                close={handleCloseAddNewItemDialog}
                maxSize='md'
                header='Add a new expense'
                body={<form className={classes.root} autoComplete='off'>
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={3} md={2} >
                        <Typography variant='body1'>
                            Product Name*:
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={10}>
                        <TextField
                            variant='outlined'
                            size='small'
                            type='text'
                            className={classes.textField}
                            fullWidth
                            onChange={handleProductNameChange}
                            error={productNameError}
                        />
                    </Grid>
                    <Grid item xs={4} sm={3} md={2}>
                        <Typography variant='body1'>
                            Purchased Date:
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={3}>
                        <TextField
                            variant='outlined'
                            size='small'
                            type='date'
                            className={classes.textField}
                            onChange={handleDateChange}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <Typography variant='body1'>
                            Price*:
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                            variant='outlined'
                            size='small'
                            type='number'
                            className={classes.textField}
                            onChange={handlePriceChange}
                            error={priceError}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <Typography variant='body1'>
                            Quantity*:
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                            variant='outlined'
                            size='small'
                            type='number'
                            className={classes.textField}
                            onChange={handleQuantityChange}
                            error={quantityError}
                        />
                    </Grid>
                    <Grid item md={10}>

                    </Grid>
                    <Grid item md={1}>
                        <Button variant='success' onClick={addNewItem}>
                            Add
                        </Button>
                    </Grid>
                    <Grid item md={1}>
                        <Button variant='danger' onClick={handleCloseAddNewItemDialog}>
                            Close
                        </Button>
                    </Grid>

                </Grid>
            </form>}
            />
        </div>
    )

}