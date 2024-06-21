import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import LoginScreen from "./pages/LoginScreen.jsx";
import { SnackbarProvider } from "notistack";
import Dashboard from "./pages/Dashboard.jsx";
import AddDevice from "./pages/AddDevice.jsx";
import DetailViewDevice from "./pages/DetailViewDevice.jsx";
import TrendScreen from "./pages/TrendScreen.jsx";
import MapView from "./pages/MapView.jsx";
import { GreenColor } from "./utils/colors.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/mainApp",
    element: <App />,
    children: [
      {
        path: "/mainApp",
        element: <Dashboard />,
      },
      {
        path: "/mainApp/addNewDevice",
        element: <AddDevice />,
      },
      {
        path: "/mainApp/detailView/:id",
        element: <DetailViewDevice />,
      },
      {
        path: "/mainApp/trendView/:id",
        element: <TrendScreen />,
      },
      {
        path: "/mainApp/mapView",
        element: <MapView />,
      },
    ],
  },
]);

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: GreenColor,
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: GreenColor,
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  // mode: primary
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider maxSnack={5}>
        <RouterProvider router={routes} />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
