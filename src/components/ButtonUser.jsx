import React from "react";
import { Avatar, Box, Button, ButtonBase, Typography } from "@mui/material";
import { GreenColor } from "../utils/colors";
import usernameIcon from "../assets/img/username.png";

const MyButton = (props) => (
  <ButtonBase
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: GreenColor,
      height: 60,
      width: "100%",
      borderRadius: 2,
      px: 2,
      "&:hover": {
        backgroundColor: GreenColor, // Adjust hover color
      },
      transition: (theme) => theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }}
    {...props}
  >
    <Box sx={{ flexGrow: 0 }}>
      <Avatar
        alt="User"
        // src={props.image && usernameIcon}
        sx={{
          width: 50,
          height: 50,
        }}
      />
    </Box>
    <Typography
      sx={{
        color: "white",
        fontWeight: "bold",
        flexGrow: 1,
      }}
    >
      Administrator
    </Typography>
  </ButtonBase>
);

export default MyButton;
