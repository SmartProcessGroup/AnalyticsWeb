import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import { GrayColor, GrayLightColor } from "../../utils/colors";
import { BCP_APP, ESP_APP, RODLIFT_APP, VFDDevice } from "../../utils/enums";

DeviceList.propTypes = {
  image: Proptypes.string.isRequired,
  wellName: Proptypes.string.isRequired,
  brand: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  deviceData: Proptypes.object.isRequired
};

export default function DeviceList({ image, wellName, brand, id, deviceData, updateHeader }) {
  function getDeviceName(){
    if (deviceData.device == VFDDevice) {
      switch (parseInt(deviceData.application)) {
        case ESP_APP:
          return "VFD ESP";
        case BCP_APP:
          return "VFD BCP";
        case RODLIFT_APP:
          return "VFD RODLIFT";
        default:
          return "VFD";
      }
    }
    return "GDN";
  }

  function updateHeader(){
    console.log("Ultimo hijo");
    
    return (
      <Box>
        <Typography >
          <span style={{ fontWeight: 'bold' }} > 
            {getDeviceName()}{" S/N: "}        
          </span>
          {deviceData.serial}
        </Typography>
      </Box>
    );
  }

  return (
    <Link to={`/mainApp/detailView/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ display: "flex", justifyContent: "space-around", backgroundColor: GrayLightColor, boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.6)', borderRadius: 0 }} onClick={updateHeader()}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto"}}>
            <Typography >
              <span style={{ fontWeight: 'bold' }} > 
                {getDeviceName()}{" S/N: "}        
              </span>
              {deviceData.serial}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.error"
              component="div"
            >
              <span style={{ fontWeight: 'bold' }} >
                Campo: {" "}
              </span>
              {deviceData.field}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.error"
              component="div"
            >
              <span style={{ fontWeight: 'bold' }} >
                Pozo: {" "}
              </span>
              {wellName}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100}}
          image={image}
          alt="VFD Logo"
        />
      </Card>
    </Link>
    
  );
}
