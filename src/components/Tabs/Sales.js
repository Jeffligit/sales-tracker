import React from 'react'
import '../../App.css'
import ContentTable from './ContentTable'
import {
    makeStyles,

} from '@material-ui/core'
import Button from 'react-bootstrap/esm/Button'



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


export default function Sales(props) {
    const classes = useStyle()

    const headerRow = (props.salesHeader.map((colTitle, i) => {
        return <th key={i}>{colTitle}</th>
    }))

    const bodyRows = props.currSales !== null && props.currSales !== undefined ? (props.currSales.map((item, i) => {
        return (
            <tr key={'tr-item'+(i+1)}>
                <td>{i+1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.pricePaid}</td>
                <td>{item.salePrice}</td>
                <td>{item.payout}</td>
                <td>{item.costToShip}</td>
                <td>{item.profit}</td>
                <td key={'td-button' + (i+1)}>
                    <Button variant='danger' onClick={() => {props.removeSale(i+1)}} className={classes.itemBtns}>
                        Remove
                    </Button>
                </td>
            </tr>
        )
    })) : <React.Fragment key={'empty'}></React.Fragment>

    return ( 
        <div>
            <ContentTable header={headerRow} body={bodyRows}/>
        </div>

    )
}