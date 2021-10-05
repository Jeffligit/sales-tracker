import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { BiEdit } from "react-icons/bi";

export default function EditButton(props) {
    return (
        <Tooltip title="edit" arrow>
            <IconButton onClick={props.onClick}>
                <BiEdit />
            </IconButton>
        </Tooltip>
    )
}