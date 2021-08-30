import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import AddBtn from '../AddBtn'
import '../../App.css'
import ContentTable from '../ContentTable'
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

    const headerRow = props.currSales !== null &&  props.currSales !== undefined ? (props.currSales[0].map((colTitle, i) => {
        return <th key={i}>{colTitle}</th>
    })) : <></>

    const bodyRows = props.currSales !== null && props.currSales !== undefined ? (props.currSales.map((row, i) => {
        if (i !== 0) {
            let item = Array(8)
            return <tr key={'tr-' + i}>{props.currSales[i].map((content, j) => {
                item[j] = content
                return <td key={'td-' + j}>{content}</td>
            })}
                <td>
                    <Button variant='danger' onClick={() => { props.removeSale(parseInt(item[0])) }} className={classes.itemBtns}>
                        Remove
                    </Button>
                </td>

            </tr>
        } else {
            return <React.Fragment key={'empty-'+i}></React.Fragment>
        }
    })) : <React.Fragment key={'empty'}></React.Fragment>

    return ( 
        <div>
            {/* This is the bar that contains buttons to change table */}
            <Navbar bg='white' >
                {/* This is for listing the buttons/user functionality */}
                <Nav>
                    {/* <Nav.Item className='Nav-item'>
                        <AddBtn />
                    </Nav.Item> */}
                </Nav>
                {/* This is for when it was last updated */}
                <Navbar.Collapse >
                </Navbar.Collapse>
            </Navbar>
            {/* This is the table for users to see their inventory */}
            <ContentTable header={headerRow} body={bodyRows}/>
        </div>

    )
}