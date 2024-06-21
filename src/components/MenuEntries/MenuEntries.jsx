import { Box, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import connectedIcon from '../../assets/img/connected_devices.png'
import addDeviceIcon from '../../assets/img/add_device.png'
import GUDIcon from '../../assets/img/GUD_analyze.png'
import productionControlIcon from '../../assets/img/production_control.png'

// Reusable component for list items
const CustomListItem = ({ to, icon, text }) => (
  <ListItemButton component={Link} to={to} sx={{py:1.6}}>
    <Box
      component="img"
      src={icon}
      alt="Custom Icon"
      sx={{ width: 26, height: 26, marginRight: text ? 1 : 0 }}
    />
    {text && (
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {text}
      </Typography>
    )}
  </ListItemButton>
);

export const connectedDevicesEntry = (
  <CustomListItem
    to="/mainApp"
    icon={connectedIcon}
    text="Dispositivos conectados"
  />
);

export const connectedDevicesEntryIcon = (
  <CustomListItem
    to="/mainApp"
    icon={connectedIcon}
  />
);

// ================================================================================================================================================ //

export const addDeviceEntry = (
  <CustomListItem
    to="/mainApp/addNewDevice"
    icon={addDeviceIcon}
    text="Añadir Nuevo Dispositivo"
  />
);

export const addDeviceEntryIcon = (
  <CustomListItem
    to="/mainApp/addNewDevice"
    icon={addDeviceIcon}
  />
);

// ================================================================================================================================================ //
export const analisiGUDEntry = (
  <CustomListItem 
    // to="/mainApp/readGUD"
    icon={GUDIcon}
    text="Analisis Data .GUD"
  />
);

export const analisiGUDEntryIcon = (
  <CustomListItem 
    // to="/mainApp/readGUD"
    icon={GUDIcon}
  />
);

// ================================================================================================================================================ //
export const productionControlEntry = (
  <CustomListItem 
    // to="/mainApp/productionControl"
    icon={productionControlIcon}
    text="Control de Producción"
  />
);

export const productionControlEntryIcon = (
  <CustomListItem 
    // to="/mainApp/productionControl"
    icon={productionControlIcon}
  />
);