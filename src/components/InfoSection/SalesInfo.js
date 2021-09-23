import React, { useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Typography
} from '@material-ui/core'


export default function SalesInfo(props) {

    const [sales, setSales] = useState(props.sales)
    const [expenses, setExpenses] = useState(props.expenses)
    const [year, setYear] = useState('0')
    const [searchYear, setSearchYear] = useState('0')
    const [yearError, setYearError] = useState(false)
    const [profitTotalForYear, setProfitTotalForYear] = useState(0)
    const [numOfUniqueItems, setNumOfUnqiueItems] = useState(0)
    const [salesTotalForYear, setSalesTotalForYear] = useState(0)


    useEffect(() => {
        setSales(props.sales)
    }, [props.sales])

    useEffect(() => {
        setExpenses(props.expenses)
    }, [props.expenses])


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
            var expenseTotal = 0;
            var uniqueItems = 0;
            var salesTotal = 0;
            var profitTotal = 0;
            for (let i = 1; i < expenses.length; i++) {
                if ((expenses[i][1]).split('/')[2] === year) {
                    expenseTotal += parseFloat(expenses[i][3]) * parseInt(expenses[i][4])
                }
            }
            for (let i = 1; i < sales.length; i++) {
                if ((sales[i][1]).split('/')[2] === year) {
                    salesTotal += parseFloat(sales[i][4])
                    profitTotal += parseFloat(sales[i][7])
                    uniqueItems += 1;
                }
            }
            profitTotal -= expenseTotal
            setSearchYear(year)
            setProfitTotalForYear(profitTotal)
            setSalesTotalForYear(salesTotal)
            setNumOfUnqiueItems(uniqueItems)
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
                    Profit total for year {searchYear} : {profitTotalForYear}
                </Typography>
                <Typography>
                    Sales total for year {searchYear} : {salesTotalForYear}
                </Typography>
                <Typography>
                    # of unique sales for year {searchYear} : {numOfUniqueItems}
                </Typography>
            </div>
        </React.Fragment>
    )
}