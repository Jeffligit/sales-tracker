import React, { useState } from 'react'
import '../../App.css'
import ContentTable from './ContentTable'
import {
    makeStyles,
    Typography,
    Grid,
    TextField,
    Tooltip,
    IconButton,
    Switch,
    FormControl,
    FormGroup,
    FormControlLabel
} from '@material-ui/core'
import Button from 'react-bootstrap/esm/Button'
import Dialog from '../General/Dialog'
import EditButton from '../General/EditButton'
import { FcUndo } from 'react-icons/fc'

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


export default function Sales(props) {
    const classes = useStyle()

    const headerRow = (props.salesHeader.map((colTitle, i) => {
        return <th key={i}>{colTitle}</th>
    }))

    const bodyRows = props.currSales !== null && props.currSales !== undefined ? (props.currSales.map((item, i) => {
        return (
            <tr key={'tr-item' + (i + 1)}>
                <td>{i + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.purchasedDate}</td>
                <td>{item.quantitySold}</td>
                <td>{item.pricePerQuantity}</td>
                <td>{item.salePrice}</td>
                <td>{item.payout}</td>
                <td>{item.costToShip}</td>
                <td>{item.profit}</td>
                <td key={'td-button' + (i + 1)}>
                    <Button variant='danger' onClick={() => { props.removeSale(i + 1) }} className={classes.itemBtns}>
                        Remove
                    </Button>
                    <EditButton onClick={() => handleOpenEditDialog(item, i + 1)} />
                    <Tooltip title="Refund / Undo">
                        <IconButton onClick={() => handleOpenRedoDialog(item, i + 1)}>
                            <FcUndo />
                        </IconButton>
                    </Tooltip>
                </td>
            </tr>
        )
    })) : <React.Fragment key={'empty'}></React.Fragment>

    const [editOpen, setEditOpen] = useState(false)
    const [productName, setProductNume] = useState('')
    const [itemBeingEdited, setItemBeingEdited] = useState(0)
    const [purchasedDate, setPurchasedDate] = useState('')
    const [soldDate, setSoldDate] = useState('')
    const [quantitySold, setQuantitySold] = useState('')
    const [price, setPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [totalPayout, setTotalPayout] = useState('')
    const [costToShip, setCostToShip] = useState('')

    const [salePriceError, setSalePriceError] = useState(false)
    const [totalPayoutError, setTotalPayoutError] = useState(false)
    const [soldDateError, setSoldDateError] = useState(false)
    const [costToShipError, setCostToShipError] = useState(false)

    const [redoOpen, setRedoOpen] = useState(false)
    const [addCostToShipToExpense, setAddCostToShipToExpense] = useState(false)
    const [redoItemNumber, setRedoItemNumber] = useState(0)
    const [redoItem, setRedoItem] = useState(null)

    function handleOpenEditDialog(item, itemNumber) {
        setItemBeingEdited(itemNumber)
        setProductNume(item.name)
        setPurchasedDate(item.purchasedDate)
        setSoldDate(item.date)
        setQuantitySold(item.quantitySold)
        setPrice(item.pricePerQuantity)
        setSalePrice(item.salePrice)
        setTotalPayout(item.payout)
        setCostToShip(item.costToShip)
        setEditOpen(true);
    }

    function handleCloseEditDialog() {
        setItemBeingEdited(0)
        setProductNume('')
        setPurchasedDate('')
        setSoldDate('')
        setQuantitySold('')
        setPrice('')
        setSalePrice('')
        setTotalPayout('')
        setCostToShip('')
        setSalePriceError(false)
        setTotalPayoutError(false)
        setSoldDateError(false)
        setCostToShipError(false)
        setEditOpen(false)
    }

    function handleSalePriceChange(event) {
        setSalePrice(event.target.value)
    }

    function handleTotalPayoutChange(event) {
        setTotalPayout(event.target.value)
    }

    function handleCostToShipChange(event) {
        setCostToShip(event.target.value)
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


    function edit() {
        let errored = false
        if (salePrice === '') {
            setSalePriceError(true)
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
            props.editSale(itemBeingEdited, soldDate, salePrice, totalPayout, costToShip);
            handleCloseEditDialog()
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

    function handleOpenRedoDialog(item, itemNumber) {
        setRedoItem(item)
        setRedoItemNumber(itemNumber)
        setProductNume(item.name)
        setRedoOpen(true)
    }

    function handleCloseRedoDialog() {
        setRedoItemNumber(0)
        setRedoOpen(false)
    }

    function handleAddCostToShipExpenseChange(event) {
        setAddCostToShipToExpense(event.target.checked)
    }

    function redo() {
        // add product back into inventory
        props.redoSale(redoItemNumber)
        // if we need to add cost to ship to expense
        if (addCostToShipToExpense) {
            props.addExpense(redoItem.date, `${redoItem.name}-Cost to ship`, 1, redoItem.costToShip)
        }
        handleCloseRedoDialog();
    }

    return (
        <div>
            <ContentTable header={headerRow} body={bodyRows} />
            <Dialog
                open={editOpen}
                close={handleCloseEditDialog}
                maxSize='md'
                header={`You are editing sale for: ${productName}`}
                body={<form className={classes.root} autoComplete='off'>
                    <Grid container spacing={2}>
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
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{purchasedDate}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={2} md={2}>
                            <Tooltip title="If you want to edit quantity sold, you must redo this sale. (Next to the edit button)">
                                <Typography variant='body1'>Quantity Sold: </Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={9} sm={1} md={1}>
                            <Tooltip title="If you want to edit quantity sold, you must redo this sale. (Next to the edit button)">
                                <Typography variant='body1' style={{ fontWeight: 600 }}>{quantitySold}</Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={4} sm={2} md={2}>
                            <Typography variant='body1'>Price Per Quantity: </Typography>
                        </Grid>
                        <Grid item xs={8} sm={1} md={2}>
                            <Typography variant='body1' style={{ fontWeight: 600 }}>{price}</Typography>
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
                                value={salePrice}
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
                                value={totalPayout}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                        </Grid>
                        <Grid item xs={5} sm={2} md={2}>
                            <Typography variant='body1'>
                                Sold Date*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={4} md={3}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='date'
                                className={classes.textField}
                                onChange={handleSoldDateChange}
                                error={soldDateError}
                                value={reverseDate(soldDate)}
                            />
                        </Grid>
                        <Grid item xs={5} sm={2} md={2}>
                            <Typography variant='body1'>
                                Cost To Ship*:
                            </Typography>
                        </Grid>
                        <Grid item xs={7} sm={3} md={4}>
                            <TextField
                                variant='outlined'
                                size='small'
                                type='number'
                                className={classes.textField}
                                onChange={handleCostToShipChange}
                                error={costToShipError}
                                value={costToShip}
                            />
                        </Grid>

                        <Grid item xs={7} sm={8} md={9}>
                        </Grid>
                        <Grid item xs={3} sm={2} md={2}>
                            <Button variant='success' onClick={edit} >
                                Confirm
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={2} md={1}>
                            <Button variant='danger' onClick={handleCloseEditDialog}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </form>}
            />

            <Dialog
                open={redoOpen}
                close={handleCloseRedoDialog}
                maxSize='sm'
                header={`You want to refund / redo: ${productName}`}
                body={
                    <form className={classes.root}>
                        <Grid container>
                            <Grid item sm={12} md={12}>
                                <FormControl>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch checked={addCostToShipToExpense} onChange={handleAddCostToShipExpenseChange} name="add cost to ship to expense" />
                                            }
                                            label="Add cost to ship to expense"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={7} sm={9} md={9}>
                            </Grid>
                            <Grid item xs={3} sm={2} md={2}>
                                <Button variant='success' onClick={() => redo()}>
                                    Confirm
                                </Button>

                            </Grid>
                            <Grid item xs={2} sm={1} md={1}>
                                <Button variant='danger' onClick={() => handleCloseRedoDialog()}>
                                    Close
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                }
            />
        </div>

    )
}