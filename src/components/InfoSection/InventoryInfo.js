import React, { useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Typography
} from '@material-ui/core'


export default function InventoryInfo(props) {

    const [inventory, setInventory] = useState(props.inventory)
    const [year, setYear] = useState('0')
    const [searchYear, setSearchYear] = useState('0')
    const [yearError, setYearError] = useState(false)
    const [totalForYear, setTotalForYear] = useState(0)
    const [numOfUniqueItems, setNumOfUnqiueItems] = useState(0)
    const [numOfItems, setNumOfItems] = useState(0)
    


    useEffect(() => {
        const newInventory = props.inventory
        setInventory(newInventory)



    }, [props.inventory])


    function handleYearChange(event) {
        setYear(event.target.value)
    }

    function searchByYear() {
        var errored = false;
        //verify it is a valid year string
        for (let i = 0; i < year.length; i++) {
            const yearChar = year.charAt(i)
            if (!(yearChar <= '9' && yearChar >= '0')) {
                errored = true;
            }
        }
        if (errored) {
            setYearError(errored)
        } else {
            setYearError(errored)
            var total = 0;
            var uniqueItems = 0;
            var itemQuantity = 0;
            for (let i = 1; i < inventory.length; i++) {
                if ((inventory[i][1]).split('/')[2] === year) {
                    total += parseFloat(inventory[i][3]) * parseInt(inventory[i][4])
                    uniqueItems += 1
                    itemQuantity += parseInt(inventory[i][4])
                }
            }
            setSearchYear(year)
            setTotalForYear(total)
            setNumOfUnqiueItems(uniqueItems)
            setNumOfItems(itemQuantity)

        }
    }



    return (
        <React.Fragment>
            <div style={{ flex: 1 }}>
                <TextField
                    error={yearError}
                    onChange={handleYearChange}
                    size='small'
                    label='Year'
                    style={{ maxWidth: '50%' }}
                />
                <Button style={{ marginLeft: '5%' }} variant="outlined" size="small" onClick={() => searchByYear()}>
                    Search
                </Button>
            </div>
            <div>
                <Typography>
                    Inventory total for year {searchYear} : {totalForYear}
                </Typography>
                <Typography>
                    # of unique items for year {searchYear} : {numOfUniqueItems}
                </Typography>
                <Typography>
                    # of items for year {searchYear} : {numOfItems}
                </Typography>
            </div>
        </React.Fragment>

    )
}