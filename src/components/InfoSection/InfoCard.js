import { Card, CardContent, Collapse, Typography, IconButton, CardHeader, Tooltip } from '@material-ui/core'
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
                    <Tooltip title={expanded ? "show less" : "show more"} arrow>
                        <IconButton onClick={handleExpandClick}>
                            {expanded ? <FcCollapse /> : <FcExpand />}
                        </IconButton>
                    </Tooltip>
                    
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