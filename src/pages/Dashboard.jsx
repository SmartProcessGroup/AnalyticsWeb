import { Button, Grid, Paper } from "@mui/material";
import DeviceList from "../components/DeviceList/DeviceList";
import SPDRIVELOGO from "../assets/img/SPDRIVE.png";
import GUARDIANLOGO from "../assets/img/guardian_logo.png"
import { useEffect, useState } from "react";
import { urlRest } from "../utils/utildata";
import { map } from "lodash";
import { GuardianDevice } from "../utils/enums";

export default function Dashboard({updateHeader}) {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    fetch(urlRest + "/api/vfd/getDevices")
      .then((response) => response.json())
      .then((data) => {
        // Process the received data (devices) here
        // Update your frontend UI with the devices data
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
        // Handle errors gracefully (e.g., display an error message to the user)
      });
  }, []);

  function getPaddingDefault() {
    return (devices.length === 0 ? 5 : 2);
  }

  const handleScanDevices = () => {
    // Scan devices
    console.log("Scanning devices...");
    fetch(urlRest + "/api/vfd/scanDevices")
      .then((response) => response.json())
      .then((data) => {
        // Process the received data (devices) here
        // Update your frontend UI with the devices data
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
        // Handle errors gracefully (e.g., display an error message to the user)
      });
  };

  return (
    <Paper
      sx={{
        p: getPaddingDefault(),
        borderRadius: 0,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 1)', 
        display: "flex",
        flexDirection: "column",
        alignItems:"start",
      }}
    >
      <Button sx={{mb: 1}} onClick={handleScanDevices}>
        Scan Devices
      </Button>
      <Grid container spacing={2}>
        {map(devices, (device) => (
          <Grid key={device["_id"]} item xs={12} md={4} lg={4}>
            <DeviceList
              image={(device.device == GuardianDevice) ? GUARDIANLOGO : SPDRIVELOGO}
              brand={device.brand}
              wellName={device.wellName}
              id={device["_id"]}
              deviceData={device}
              updateHeader={updateHeader}
            />
          </Grid>
        ))}
      </Grid>
      
    </Paper>
  );
}
