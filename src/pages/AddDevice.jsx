import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { urlRest } from "../utils/utildata";
import { validarIP } from "../utils/utilsFunc";
import { useSnackbar } from "notistack";
import { BCP_APP, ESP_APP, GuardianDevice, HPS_Guardian, RODLIFT_APP, Standard_Guardian, VFDDevice } from "../utils/enums";
import React from "react";
import { useNavigate } from 'react-router-dom';


export default function AddDevice(){
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [brand, setBrand] = React.useState('')
  const [device, setDevice]  = React.useState('');
  const [application, setApplication] = React.useState('');

  const handleDeviceChange = (event) => {
    let device = event.target.value 
    setDevice(device);
    (device == VFDDevice) ? setBrand('SPDrive') : setBrand('Smart Process'); 
  };

  const handleApplicationChange = (event) => {
    setApplication(event.target.value );
  };

  const handleVFDSubmit = async (event) => {
    let errors = {};
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const ip = validarIP(data.get("ipAddress"));
    const subnetMask = validarIP(data.get("subnetMask"));
    const gateway = validarIP(data.get("defaultGateway"));

    if (!ip || !subnetMask) {
      errors.ipAddress = "Direccion IP No Valida";
    }
    if (!subnetMask) {
      errors.subnetMask = "Mascara de Subred No Valida";
    }
    if (!gateway) {
      errors.defaultGateway = "Puerta de Enlace No Valida";
    }

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((element) => {
        enqueueSnackbar(element);
      });
      return;
    } 

    try {
      const response = await fetch(urlRest + "/api/vfd/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wellName: data.get("wellName"),
          brand: data.get("brand"),
          ipAddress: data.get("ipAddress"),
          subnetMask: data.get("subnetMask"),
          gateway: data.get("defaultGateway"),
          idModbus: data.get("modbusID"),
          serial: data.get('serialName'),
          field: data.get('fieldName'),
          device: data.get('deviceName'),
          application: data.get('applicationName')
        }),
      });
      console.log('aaaa');
      if (!response.ok) {
        throw new Error('Error de Red');
      }

      enqueueSnackbar('¡Dispositivo añadido correctamente!', { variant: 'success' });
      navigate('/mainApp');

    } catch (error) {
      enqueueSnackbar('Fallo al añadir dispositivo: ' + error.message, { variant: 'error' });
    }
  };


  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 0, backgroundColor: "#E8E8E8" }}>
      {/* Header */}
      <Typography variant="h5">
        <AddModeratorIcon /> Agregar Nuevo Dispositivo
      </Typography>
      <Typography variant="subtitle1">
        Agrega un nuevo dispositivo a la base de datos
      </Typography>

      {/* Body */}
      <Box onSubmit={handleVFDSubmit} component={"form"}>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }}>
          Datos Generales
        </Divider>

        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="wellName"
              label="Nombre del Pozo"
              name="wellName"
              autoComplete="off"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="fieldId"
              label="Nombre del Campo"
              name="fieldName"
              autoComplete="off"
              // autoFocus
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="serialId"
              label="Serial del Dispositivo"
              name="serialName" 
              autoComplete="off"
              // autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="brand"
              label="Marca del VFD"
              name="brand"
              autoComplete="off"
              InputProps={{
                readOnly: true,
              }}
              value={brand}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel id="deviceID-label">Device</InputLabel>
              <Select
                required
                fullWidth
                value={device}
                labelId="deviceID-label"
                id="deviceID"
                label="Device"
                name="deviceName"
                onChange={handleDeviceChange}
              >
                <MenuItem value={GuardianDevice}>Guardian</MenuItem>
                <MenuItem value={VFDDevice}>VFD</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>   
            <FormControl required fullWidth>
              <InputLabel id="applicationID-label">Application</InputLabel>
              <Select
                required
                fullWidth
                value={application}
                labelId="applicationID-label"
                id="applicationID"
                label="Application"
                name="applicationName"
                onChange={handleApplicationChange}
              >
                {(device == GuardianDevice) && <MenuItem value={Standard_Guardian}> ESTANDAR </MenuItem>}
                {(device == GuardianDevice) && <MenuItem value={HPS_Guardian}> HPS </MenuItem>}
                
                {(device == VFDDevice) && <MenuItem value={ESP_APP}> ESP </MenuItem>}
                {(device == VFDDevice) && <MenuItem value={BCP_APP}> BCP </MenuItem>}
                {(device == VFDDevice) && <MenuItem value={RODLIFT_APP}> ROD LIFT </MenuItem>} 
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 1, marginBottom: 1 }}>Datos Modbus</Divider>

        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="ipaddress"
              label="Direccion IP"
              name="ipAddress"
              autoComplete="off"
              placeholder="XXX.XXX.XXX.XXX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="subnetMask"
              label="Mascara de Subred"
              name="subnetMask"
              autoComplete="off"
              placeholder="XXX.XXX.XXX.XXX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="defaultGateway"
              label="Puerta de Enlace Predeterminada"
              name="defaultGateway"
              autoComplete="off"
              placeholder="XXX.XXX.XXX.XXX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              required
              fullWidth
              id="modbusID"
              label="Modbus ID"
              name="modbusID"
              autoComplete="off"
              placeholder="XXX"
            />
          </Grid>
        </Grid>
        <Divider
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        />
        <Button type="submit" fullWidth size="large" variant="contained">
          Agregar Nuevo VFD
        </Button>
      </Box>
    </Paper>
  );
}
