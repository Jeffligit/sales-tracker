import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InfoCard from './InfoCard'
import InventoryInfo from './InventoryInfo'
import ExpenseInfo from './ExpenseInfo'
import SalesInfo from './SalesInfo'

const useStyle = makeStyles((theme) => ({
    infoCard: {
        margin: '10px'
    },
    infoCardLeft: {
        marginLeft: 'auto',
        marginTop: '10px',
        marginBottom: '10px'
    },
    infoCardRight: {
        marginRight: 'auto',
        marginTop: '10px',
        marginBottom: '10px'
    }
}))


export default function InventorySalesExpenseInfo(props) {

    const classes = useStyle()

    const [inventoryTitle, setInventoryTitle]= useState(`Inventory Total Cost: ${props.inventoryTotal}`)
    const [profitTitle, setProfitTitle]= useState(`Profit Total Cost: ${props.profitTotal}`)
    const [expenseTitle, setExpensesTitle]= useState(`Expenses Total Cost: ${props.expenseTotal}`)

    useEffect(() => {
        setInventoryTitle(`Inventory Value: ${props.inventoryTotal}`)
    }, [props.inventoryTotal])

    useEffect(() => {
        setProfitTitle(`Total Lifetime Profit After Expenses: ${props.profitTotal}`)
    }, [props.profitTotal])

    useEffect(() => {
        setExpensesTitle(`Total Lifetime Expenses: ${props.expenseTotal}`)
    }, [props.expenseTotal])

    const inventoryInfo = <InventoryInfo inventory={props.inventory}/>
    const expensesInfo = <ExpenseInfo expenses={props.expenses}/>
    const salesInfo = <SalesInfo sales={props.sales} expenses={props.expenses}/>

    return (
        <div>
            <Grid container style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <Grid item className={classes.infoCardLeft} md={3} sm={3} xs={3}>
                    <InfoCard title={inventoryTitle} content={inventoryInfo}/>
                </Grid>
                <Grid item className={classes.infoCard} md={3} sm={3} xs={3}>
                    <InfoCard title={profitTitle} content={salesInfo}/>
                </Grid>
                <Grid item className={classes.infoCardRight} md={3} sm={3} xs={3}> 
                    <InfoCard title={expenseTitle} content={expensesInfo}/>
                </Grid>
            </Grid>
        </div>
    )
}