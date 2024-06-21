import { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { map } from "lodash";
import svgMarkerRunning from "../assets/SVG/3.svg";
import svgMarkerOff from "../assets/SVG/2.svg";
import svgMarkerWarning from "../assets/SVG/4.svg";
import svgMarkerDisconnect from "../assets/SVG/1.svg";

const containerStyle = {
  width: "100%",
  height: "70vh",
};
//10.465578397130615, -71.95502411437145
const center = {
  lat: 10.465578397130615,
  lng: -71.95502411437145,
};

const markersData = [
  {
    position: {
      lat: 10.410440408,
      lng: -71.997194128,
    }, // Posición del marcador 1
    state: 0, // Estado inicial del marcador 1 (entre 0 y 3)
    title: "BN-123",
  },
  {
    position: {
      lat: 10.394647065,
      lng: -71.978360978,
    }, // Posición del marcador 2
    state: 0, // Estado inicial del marcador 2 (entre 0 y 3)
    title: "BN-484",
  },
  // ... más marcadores
];

const markerLabelStyle = {
  position: 'absolute',
  transform: 'translate(0, 0)', // Center the label on the marker
  backgroundColor: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '5px',
  borderRadius: '50%',
  zIndex: 1, // Ensure label stays above marker icon
};

export default function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD2p2QMKV317r4YKvuGqh4KGtz7CaM56yA",
  });

  function getInfoWindowContent(marker) {
    return (
      <div>
        <Typography
          textAlign={"center"}
          variant="body2"
          sx={{
            my: 1,
          }}
        >
          {marker.title}
        </Typography>
        <Button variant="contained" color="primary">
          Detalles
        </Button>
      </div>
    );
  }

  function generateIcon(state) {
    // You can use techniques like SVG inline or libraries to inject color
    const scale = new window.google.maps.Size(50, 50);
    switch (state) {
      case 0:
        return {
          url: svgMarkerRunning, // Use the base icon URL
          scaledSize: scale, // Set icon size
        };
      case 1:
        return {
          url: svgMarkerOff, // Use the base icon URL
          scaledSize: scale, // Set icon size
        };
      case 2:
        return {
          url: svgMarkerWarning, // Use the base icon URL
          scaledSize: scale, // Set icon size
        };
      default:
        return {
          url: svgMarkerDisconnect, // Use the base icon URL
          scaledSize: scale, // Set icon size
        };
    }
  }
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  return isLoaded ? (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={() => setSelectedMarker(null)} // Close info window on map click
      >
        {map(markersData, (markerData, id) => (
            <Marker
            key={id}
              onClick={() => handleMarkerClick(markerData)}
              position={markerData.position}
              icon={generateIcon(markerData.state)}
              title={markerData.title} // Pass marker title
            />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            {getInfoWindowContent(selectedMarker)}
          </InfoWindow>
        )}
      </GoogleMap>
    </Paper>
  ) : (
    <></>
  );
}
