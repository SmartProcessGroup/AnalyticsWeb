import React from "react";
import {
  Link,
  Typography,
} from "@mui/material";

export default function CopyRightComponent(props){
    return (
        <Typography
            variant="body2"
            color='#FFFFFF'
            align="center"
            fontSize={16}
            fontWeight={"bold"}
            {...props}
        >
            {"Copyright © Analytics Web "}
            {" "} {new Date().getFullYear()}.
        </Typography>
        );
}