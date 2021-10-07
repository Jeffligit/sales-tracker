import React, { useState } from 'react'
import AddBtn from '../General/AddBtn'
import '../../App.css'
import ContentTable from './ContentTable'
import {
    makeStyles,
    TextField,
    Grid,
    Typography,
} from '@material-ui/core'
import Button from 'react-bootstrap/esm/Button'
import Dialog from '../General/Dialog'
import EditButton from '../General/EditButton'

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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

    const headerRow = (props.expensesHeader.map((colTitle, i) => {
        return <th key={i}>{colTitle === '' ? <AddBtn btnFunc={handleOpenAddNewItemDialog} /> : colTitle}</th>
    }))

    const bodyRows = props.currExpense !== null && props.currExpense !== undefined ? (props.currExpense.map((item, i) => {
        return (
            <tr key={'tr-item' + (i + 1)}>
                <td>{i + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td key={'td-button' + i}>
                    <Button variant='danger' onClick={() => { props.removeExpense(i + 1) }} className={classes.itemBtns}>
                        Remove
                    </Button>
                    <EditButton onClick={() => handleOpenEditDialog(item, i + 1)}/>
                </td>
            </tr>
        )
    })) : <React.Fragment key={'empty'}></React.Fragment>

    const [newItemOpen, setNewItemOpen] = useState(false)
    const [productName, setProductName] = useState('')
    const [date, setDate] = useState('Unknown')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productNameError, setProductNameError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [buttonText, setButtonText] = useState("Add")
    const [displayDate, setDisplayDate] = useState('')

    // edit states
    const [editOpen, setEditOpen] = useState(false)
    const [editingProductName, setEditingProductName] = useState('')
    const [itemNumberBeingEdited, setItemNumberBeingEdited] = useState(0)


    function handleOpenAddNewItemDialog() {
        setButtonText("Add")
        setNewItemOpen(true)
    }

    function handleCloseAddNewItemDialog() {
        setNewItemOpen(false)
        setEditOpen(false)
        setProductName('')
        setDate('Unknown')
        setPrice('')
        setQuantity('')
        setProductNameError(false)
        setPriceError(false)
        setQuantityError(false)
        setDisplayDate('')
        setEditingProductName('')
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
            props.addNewExpense(date, productName, parseInt(quantity), parseFloat(price));
            handleCloseAddNewItemDialog();
        }
    }

    function reverseDate(date) {
        if (date === 'Unknown') {
            return ''
        }

        let stringDate = date.split('/')
        let revisedDate = stringDate[2] + '-' + stringDate[0] + '-' + stringDate[1]
        return revisedDate
    }

    // edit functions
    function handleOpenEditDialog(item, itemNumber) {
        setEditingProductName(item.name)
        setItemNumberBeingEdited(itemNumber)
        setDate(item.date)
        setDisplayDate(reverseDate(item.date))
        setProductName(item.name)
        setPrice(item.price)
        setQuantity(item.quantity)
        setButtonText("Confirm")
        setEditOpen(true)
    }


    function edit() {
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
            props.editExpense(itemNumberBeingEdited, date, productName, quantity, price)
            handleCloseAddNewItemDialog()
        }
    }

    return (
        <div>
            {/* This is the table for users to see their Expense */}
            <ContentTable header={headerRow} body={bodyRows} />
            <Dialog
                open={newItemOpen || editOpen}
                close={handleCloseAddNewItemDialog}
                maxSize='md'
                header={newItemOpen ? 'Add a new item' : `Editing item: ${editingProductName}` }
                body={<form className={classes.root} autoComplete='off'>
                    <Grid container spacing={2}>
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
                                value={productName}
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
                                value={displayDate}
                            />
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                            <Typography variant='body1'>
                                Quantity*:
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={4} md={2}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleQuantityChange}
                                error={quantityError}
                                value={quantity}
                            />
                        </Grid>
                        <Grid item xs={2} sm={1} md={1}>
                            <Typography variant='body1'>
                                Price*:
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={2}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handlePriceChange}
                                error={priceError}
                                value={price}
                            />
                        </Grid>
                        <Grid item xs={7} sm={8} md={9}>
                        </Grid>
                        <Grid item xs={3} sm={2} md={2}>
                            {newItemOpen ?
                                <Button variant='success' onClick={() => addNewItem()}>
                                    {buttonText}
                                </Button>
                                :
                                <Button variant='success' onClick={() => edit()}>
                                    {buttonText}
                                </Button>
                            }
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                            <Button variant='danger' onClick={() => handleCloseAddNewItemDialog()}>
                                Close
                            </Button>
                        </Grid>

                    </Grid>
                </form>}
            />
        </div>
    )

}