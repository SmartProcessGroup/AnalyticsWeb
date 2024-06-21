import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  styled,
} from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import background_login from "../assets/img/background_login.png";
import username from "../assets/img/username.png";
import spg_logo from "../assets/img/SPG_Logo.png";
import { urlRest } from "../utils/utildata";
import CopyRightComponent from "../components/CopyRightComponent.jsx"
import { BlackColor, GrayColor, GrayLogin } from "../utils/colors.js";

const TextFieldStyled = styled(TextField)({
  '& .MuiInputBase-root': {
    color: '#FFFFFF', // Text color
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#FFFFFF', // Border color when hovered
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF', // Border color when focused
    }
  },
  '& .MuiInputLabel-root': {
    color: '#FFFFFF', // Label color
    textAlign: 'center',
  },
  backgroundColor:'#000000',
  textAlign: 'center'
});

export default function LoginScreen() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(urlRest + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("Login successful", { variant: "success" });
          navigate("/mainApp");
        } else {
          enqueueSnackbar("Invalid username or password", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", position: 'relative'}} >
      <CssBaseline />
      
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${background_login})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "start",
        }}
      />
      <Grid item xs={12} sx={{backgroundColor: BlackColor, px:'10%'}} sm={8} md={7} component={Paper} square alignContent={'center'} position={'relative'}>
        <img src={spg_logo} alt="Logo" width={"auto"} height={40} style={{ position: 'absolute', bottom: 10, right: 10}} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: GrayLogin,
            justifyContent: 'center',
          }}
        >
          {/* IMAGE USER */}
          <Avatar alt="User" src={username} sx={{
            mt:3,
            width:100,
            height:100
          }}/>
          
          {/* FORM LOGIN */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ 
              mt: 1, 
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
              width: '50%'
            }}
          >
            <TextFieldStyled
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus

              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <PersonIcon style={{ color: '#FFFFFF' }} /> {/* Adjust icon color */}
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldStyled
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <LockIcon style={{ color: '#FFFFFF' }} /> {/* Adjust icon color */}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                backgroundColor: BlackColor,
                '&:hover': {
                  backgroundColor: BlackColor
                },
              }}
            >
              Sign In
            </Button>
            
            {/* Forgot Password and Remember me (tough i have to say good bye :'c) */}
            <Grid container alignItems="center" fullWidth>
              <Grid item xs={5} md={6}>
                <Grid container justifyContent="center">
                  <Checkbox
                    sx={{
                      color: '#FFFFFF',
                    }}
                    size="small"
                  />
                  <Typography
                    fontSize={12}
                    textAlign="center"
                    alignContent="center"
                    sx={{
                      color: '#FFFFFF',
                    }}
                  >
                    Remember me
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={7} md={6}>
                <Typography textAlign="center" fontSize={12}>
                  <Link   
                    sx={{
                      color: '#FFFFFF',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}       
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Grid>
            </Grid>

            {/* Create account button*/}
            <Typography
                mt={7}
                fontSize={12}
                textAlign="center"
                alignContent="center"
                sx={{
                  color: GrayColor,
                }}
              >
                Not a member?
            </Typography>

            <Button
              variant="outlined"
              sx={{ 
                mt: 0.5,
                mb: 3,
                fontSize: 12,
                borderRadius: 10,
                borderColor: GrayColor,
                color: GrayColor,
                '&:hover': {
                  color: '#1565C0'
                },
                width: "70%",
                height: 30
              }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
        <CopyRightComponent sx={{mt: 3}}/>
      </Grid>
    </Grid>
  );
}
