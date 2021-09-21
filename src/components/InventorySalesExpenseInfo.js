import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InfoCard from './InfoCard'

const useStyle = makeStyles((theme) => ({
    infoCard: {
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '10px'
    },
    infoCardLeft: {
        marginLeft: 'auto',
        marginTop: '10px'
    },
    infoCardRight: {
        marginRight: 'auto',
        marginTop: '10px'
    }
}))


export default function InventorySalesExpenseInfo(props) {

    const classes = useStyle()

    const [inventoryTitle, setInventoryTitle]= useState(`Inventory Total Cost: ${props.inventoryTotal}`)
    const [profitTitle, setProfitTitle]= useState(`Profit Total Cost: ${props.profitTotal}`)
    const [expenseTitle, setExpensesTitle]= useState(`Expenses Total Cost: ${props.expenseTotal}`)

    useEffect(() => {
        setInventoryTitle(`Inventory Total Cost: ${props.inventoryTotal}`)
    }, [props.inventoryTotal])

    useEffect(() => {
        setProfitTitle(`Profit Total Cost: ${props.profitTotal}`)
    }, [props.profitTotal])

    useEffect(() => {
        setExpensesTitle(`Expenses Total Cost: ${props.expenseTotal}`)
    }, [props.expenseTotal])

    return (
        <div>
            <Grid container style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <Grid item className={classes.infoCardLeft} md={3} sm={3} xs={3}>
                    <InfoCard title={inventoryTitle} content={props.firstCardBody}/>
                </Grid>
                <Grid item className={classes.infoCard} md={3} sm={3} xs={3}>
                    <InfoCard title={profitTitle} content={props.secondCardBody}/>
                </Grid>
                <Grid item className={classes.infoCardRight} md={3} sm={3} xs={3}> 
                    <InfoCard title={expenseTitle} content={props.thirdCardBody}/>
                </Grid>
                
            </Grid>

        </div>
    )
}