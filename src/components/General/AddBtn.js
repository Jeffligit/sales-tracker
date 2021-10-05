import React from 'react'
import { FcPlus } from 'react-icons/fc'
import Button from 'react-bootstrap/Button'


export default function AddBtn(props) {
    return (
        <Button variant='outline-success' onClick={props.btnFunc}>
            <FcPlus/> Add Item
        </Button>
    )
}