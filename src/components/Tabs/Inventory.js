import React, { useState } from 'react'
import AddBtn from '../AddBtn'
import '../../App.css'
import ContentTable from './ContentTable'
import {
    makeStyles,
    TextField,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core'
import Button from 'react-bootstrap/esm/Button'
import Dialog from '../Dialog'
import { BiEdit } from "react-icons/bi";


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

export default function Inventory(props) {

    const classes = useStyle()

    const headerRow = (props.inventoryHeader.map((colTitle, i) => {
        return <th key={'th' + i}>{colTitle === '' ? <AddBtn btnFunc={handleOpenAddNewItemDialog} /> : colTitle}</th>
    }))

    const bodyRows = props.currInventory !== null && props.currInventory !== undefined ? (props.currInventory.map((item, i) => {
        return (
            <tr key={'tr-item' + (i+1)} >
                <td>{i+1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td key={'td-button' + (i+1)}>
                    <Button variant='danger' onClick={() => {props.removeInventory(i+1)}} className={classes.itemBtns}>
                        Remove
                    </Button>
                    <Button variant='success' onClick={() => handleOpenSoldDialog(item, i+1)}>
                        Sold
                    </Button>
                    <IconButton onClick={() => handleOpenEditDialog(item, i+1)}>
                        <BiEdit/>
                    </IconButton>
                </td>
            </tr>
        )
    })) : <React.Fragment key={'empty'}></React.Fragment>

    // states for new item dialog

    const [newItemOpen, setNewItemOpen] = useState(false)
    const [productName, setProductName] = useState('')
    const [date, setDate] = useState('Unknown')
    const [displayDate, setDisplayDate] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [productNameError, setProductNameError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [buttonText, setButtonText] = useState("Add")

    // states for sold dialog
    const [soldOpen, setSoldOpen] = useState(false)
    const [itemNumberBeingSold, setItemNumberBeingSold] = useState(0)
    const [salePrice, setSalePrice] = useState('')
    const [soldDate, setSoldDate] = useState('')
    const [quantitySold, setQuantitySold] = useState('')
    const [totalPayout, setTotalPayout] = useState('')
    const [costToShip, setCostToShip] = useState('')
    const [salePriceError, setSalePriceError] = useState(false)
    const [quantitySoldError, setQuantitySoldError] = useState(false)
    const [totalPayoutError, setTotalPayoutError] = useState(false)
    const [costToShipError, setCostToShipError] = useState(false)
    const [soldDateError, setSoldDateError] = useState(false)
    

    // states for edit dialog
    const [editOpen, setEditOpen] = useState(false)
    const [itemNumberBeingEdited, setItemNumberBeingEdited] = useState(0)

    // function for new item dialog
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
            props.addNewInventory(date, productName, parseFloat(price), parseInt(quantity))
            handleCloseAddNewItemDialog()
        }
    }

    function handleDateChange(event) {
        let stringDate = event.target.value.split('-')

        let revisedDate = stringDate[1] + '/' + stringDate[2] + '/' + stringDate[0]

        if (stringDate[1] === undefined) {
            setDate('Unknown')
            return
        }
        setDate(revisedDate)
        setDisplayDate(reverseDate(revisedDate))
    }

    function handleSoldDateChange(event) {
        let stringDate = event.target.value.split('-')

        let revisedDate = stringDate[1] + '/' + stringDate[2] + '/' + stringDate[0]

        if (stringDate[1] === undefined) {
            setSoldDate('Unknown')
            return
        }
        setSoldDate(revisedDate)
    }


    // functions regarding sold dialog
    function handleOpenSoldDialog(item, itemNumber) {
        setProductName(item.name)
        setDate(item.date)
        setPrice(item.price)
        setQuantity(item.quantity)
        setItemNumberBeingSold(itemNumber)
        setSoldOpen(true)
    }

    function handleCloseSoldDialog() {
        setProductName('')
        setDate('')
        setPrice('')
        setQuantity('')

        setSalePrice('')
        setQuantitySold('')
        setTotalPayout('')
        setCostToShip('')
        setSoldDate('')
        
        setSalePriceError(false)
        setQuantitySoldError(false)
        setTotalPayoutError(false)
        setCostToShipError(false)
        setItemNumberBeingSold(0)
        setSoldOpen(false)
    }

    function handleSalePriceChange(event) {
        setSalePrice(event.target.value)
    }

    function handleQuantitySoldChange(event) {
        setQuantitySold(event.target.value)
    }

    function handleTotalPayoutChange(event) {
        setTotalPayout(event.target.value)
    }

    function handleCostToShipChange(event) {
        setCostToShip(event.target.value)
    }

    function sold() {
        let errored = false
        if (salePrice === '') {
            setSalePriceError(true)
            errored = true
        }

        if (quantitySold === '') {
            setQuantitySoldError(true)
            errored = true
        } else if (parseInt(quantitySold) <= 0 || parseInt(quantitySold) > quantity) {
            setQuantitySoldError(true)
            errored = true
        }

        if (totalPayout === '') {
            setTotalPayoutError(true)
            errored = true
        }

        if (costToShip === '') {
            setCostToShipError(true)
            errored = true
        }

        if (soldDate === '' || soldDate === 'Unknown') {
            setSoldDateError(true)
            errored = true
        }

        if (errored) {
            return
        } else {
            props.selling(itemNumberBeingSold, date, parseFloat(salePrice), parseFloat(totalPayout), parseFloat(costToShip), parseInt(quantitySold));
            handleCloseSoldDialog()
        }

    }

    // functions for editing dialog

    function handleOpenEditDialog(item, itemNumber) {
        setItemNumberBeingEdited(itemNumber)
        setDate(item.date)
        setDisplayDate(reverseDate(item.date))
        setProductName(item.name)
        setPrice(item.price)
        setQuantity(item.quantity)
        setButtonText("Confirm")
        setEditOpen(true)
    }

    function reverseDate(date) {
        if (date === 'Unknown') {
            return ''
        }

        let stringDate = date.split('/')
        let revisedDate = stringDate[2] + '-' + stringDate[0] + '-' + stringDate[1]
        return revisedDate
    }

    async function edit() {
        props.editInventory(itemNumberBeingEdited, date, productName, price, quantity)
        handleCloseAddNewItemDialog()
    }

    return (
        <div >
            {/* This is the table for users to see their inventory */}
            <ContentTable header={headerRow} body={bodyRows} />
            <Dialog
                open={newItemOpen || editOpen}
                close={handleCloseAddNewItemDialog}
                maxSize='md'
                header='Add a new item'
                body={<form className={classes.root} autoComplete='off'>
                    <Grid container spacing={3} >
                        <Grid item xs={4} sm={3} md={2}>
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
                        <Grid item xs={2} sm={1} md={1}>
                            <Typography variant='body1'>
                                Price*:
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={5} md={2}>
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
                        <Grid item xs={8} sm={8} md={9}>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            {newItemOpen ?
                            <Button variant='success' onClick={() => addNewItem()}>
                                {buttonText}
                            </Button> 
                            :
                            <Button variant='success' onClick={() => edit()}>
                                {buttonText}
                            </Button> }
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                            <Button variant='danger' onClick={() => handleCloseAddNewItemDialog()}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </form>} />
            <Dialog
                open={soldOpen}
                close={handleCloseSoldDialog}
                maxSize='md'
                header={`You sold ${productName}`}
                body={<form className={classes.root} autoComplete='off'>
                    <Grid container spacing={3}>
                        <Grid item xs={5} sm={3} md={2}>
                            <Typography variant='body1' >Product Name: </Typography>
                        </Grid>
                        <Grid item xs={7} sm={9} md={10}>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{productName}</Typography>
                        </Grid>
                        <Grid item xs={5} sm={3} md={2}>
                            <Typography variant='body1'>Purchased Date: </Typography>
                        </Grid>
                        <Grid item xs={7} sm={2} md={2}>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{date}</Typography>
                        </Grid>
                        <Grid item xs={4} sm={2} md={2}>
                            <Typography variant='body1'>Price Paid: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={1} md={1}>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{price}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={2} md={2}>
                            <Typography variant='body1'>Quantity: </Typography>
                        </Grid>
                        <Grid item xs={9} sm={1} md={3}>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{quantity}</Typography>
                        </Grid>

                        <Grid item xs={5} sm={3} md={2}>
                            <Typography variant='body1'>
                                Total Sale Price*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={3} md={2}>

                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleSalePriceChange}
                                error={salePriceError}
                            />
                        </Grid>
                        <Grid item xs={5} sm={2} md={2}>
                            <Typography variant='body1'>
                                Total Payout*:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleTotalPayoutChange}
                                error={totalPayoutError}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                        </Grid>
                        <Grid item xs={5} sm={3} md={2}>
                            <Typography variant='body1'>
                                Quantity Sold*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={3} md={4}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleQuantitySoldChange}
                                error={quantitySoldError}
                                helperText='Must be greater than 0 and less than quantity'
                            />
                        </Grid>
                        <Grid item xs={5} sm={2} md={2}>
                            <Typography variant='body1'>
                                Sold Date*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={4} md={4}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='date'
                                className={classes.textField}
                                onChange={handleSoldDateChange}
                                error={soldDateError}
                            />
                        </Grid>
                        <Grid item xs={5} sm={3} md={2}>
                            <Typography variant='body1'>
                                Cost To Ship*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={3} md={10}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleCostToShipChange}
                                error={costToShipError}
                            />
                        </Grid>

                        <Grid item xs={7} sm={8} md={8}>
                        </Grid>
                        <Grid item xs={3} sm={2} md={2}>
                            <Button variant='success' onClick={sold} >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            <Button variant='danger' onClick={handleCloseSoldDialog}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </form>}
            />

        </div>

    )
}