import { Card, CardContent, Collapse, Typography, IconButton, CardHeader } from '@material-ui/core'
import React, { useState } from 'react'
import { FcExpand, FcCollapse } from 'react-icons/fc'



export default function InfoCard(props) {
    const [expanded, setExpanded] = useState(false)

    function handleExpandClick() {
        setExpanded(!expanded)
    }

    return (

        <Card variant='outlined'>
            <CardHeader
                title={
                    <Typography style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {props.title}
                    </Typography>
                }
                action={
                    <IconButton onClick={handleExpandClick}>
                        {expanded ? <FcCollapse /> : <FcExpand />}
                    </IconButton>
                }

            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {props.content}
                </CardContent>
            </Collapse>
        </Card>
    )
}