import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlRest } from "../utils/utildata";
import io from "socket.io-client";
import { Box, Button, Divider, Icon, Paper, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import moment from "moment";
import { ShowChartOutlined } from "@mui/icons-material";
import AnalyticsIcon from "../assets/img/analytics.png";
import { BlackColor, DarkBrownColor, GrayColor, GrayLightColor, GreenColor, WhiteColor } from "../utils/colors";

const columns = [
  {
    field: "datetime",
    headerName: "Fecha / Hora",
    width: 200,
    editable: false,
    type: "dateTime",
  },
  {
    field: "rpmMotor",
    headerName: "RPM Motor",
    width: 100,
    editable: false,
  },
  {
    field: "romVarilla",
    headerName: "RPM Varilla",
    width: 100,
    editable: false,
  },
  {
    field: "rpmMotorBSP",
    headerName: "RPM Motor Backspin",
    width: 150,
    editable: false,
  },
  {
    field: "rpmVarillaBSP",
    headerName: "RPM Varilla Backspin",
    width: 150,
    editable: false,
  },
  {
    field: "torque",
    headerName: "Torque",
    width: 100,
    editable: false,
  },
  {
    field: "frecuencia",
    headerName: "Freciencia",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsAB",
    headerName: "VRMS AB",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsBC",
    headerName: "VRMS BC",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsAC",
    headerName: "VRMS AC",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsA",
    headerName: "VRMS A",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsB",
    headerName: "VRMS B",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsC",
    headerName: "VRMS C",
    width: 100,
    editable: false,
  },
  {
    field: "vrmsN",
    headerName: "VRMS Neutro",
    width: 100,
    editable: false,
  },
  {
    field: "DesbV",
    headerName: "Desbalance de Voltaje",
    width: 200,
    editable: false,
  },
  {
    field: "ampAM1",
    headerName: "Amp A Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "ampBM1",
    headerName: "Amp B Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "ampCM1",
    headerName: "Amp C Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "ampANM1",
    headerName: "Amp Neutro Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "ampTM1",
    headerName: "Amp Total Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "DesbAmpM1",
    headerName: "Desbalance de Corriente Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "ampAM2",
    headerName: "Amp A Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "ampBM2",
    headerName: "Amp B Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "ampCM2",
    headerName: "Amp C Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "ampANM2",
    headerName: "Amp Neutro Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "ampTM2",
    headerName: "Amp Total Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "DesbAmpM2",
    headerName: "Desbalance de Corriente Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "KVaAM1",
    headerName: "KVa A Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "KVaBM1",
    headerName: "KVa B Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "KVaCAM1",
    headerName: "KVa C Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "KVaTM1",
    headerName: "KVa Total Motor 1",
    width: 150,
    editable: false,
  },
  {
    field: "KVaAM2",
    headerName: "KVa A Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "KVaBM2",
    headerName: "KVa B Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "KVaCAM2",
    headerName: "KVa C Motor 2",
    width: 150,
    editable: false,
  },
  {
    field: "KVaTM2",
    headerName: "KVa Total Motor 2",
    width: 150,
    editable: false,
  },
  { field: "id", headerName: "ID", width: 90 },
];

export default function DetailViewDevice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deviceInfo, setDeviceInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    const socket = io(urlRest);
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    fetch(urlRest + "/api/vfd/getDeviceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const startTime = performance.now();
        // let arrAux = [],
        //   objAux = {};
        // data.reads.forEach((read, recordId) => {
        //   columns.forEach((column, idItem) => {
        //     if (column.field === "datetime") {
        //       objAux["datetime"] = moment(
        //         moment(read["Timestamp"]).format("DD/MM/YYYYY HH:mm:ss"),
        //         "DD/MM/YYYYY HH:mm:ss"
        //       ).toDate();
        //     } else if (column.field === "id") {
        //       objAux["id"] = recordId;
        //     } else {
        //       objAux[column.field] = read[0 + idItem - 1] / 10;
        //     }
        //   });
        //   arrAux.push(objAux);
        //   objAux = {};
        // });
        // setRows(arrAux);
        // setDeviceInfo(data.deviceData);
        // setLoading(false);

        const formattedRows = data.reads.map((read, recordId) => {
          const row = {};
          columns.forEach((column, idItem) => {
            switch (column.field) {
              case "datetime":
                row.datetime = moment(
                  moment(read.Timestamp).format("DD/MM/YYYYY HH:mm:ss"),
                  "DD/MM/YYYYY HH:mm:ss"
                ).toDate();
                break;

              case "id":
                row.id = recordId;
                break
            
              default:
                row[column.field] = read[0 + idItem - 1] / 10;
                break;
            }
          });
          return row;
        });

        setRows(formattedRows);
        setDeviceInfo(data.deviceData);
        setLoading(false);

        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Execution time: ${executionTime} milliseconds`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{mb:1}}>
        <GridToolbarColumnsButton sx={{backgroundColor: DarkBrownColor, color: WhiteColor, px: 1.5, height:35,
          '&:hover':{
            backgroundColor: DarkBrownColor
          }
        }} />
        <GridToolbarFilterButton sx={{backgroundColor: DarkBrownColor, color: WhiteColor, px: 1.5, height:35,
          '&:hover':{
            backgroundColor: DarkBrownColor
          },
        }} />
        <GridToolbarDensitySelector sx={{backgroundColor: DarkBrownColor, color: WhiteColor, px: 1.5, height:35, 
          '&:hover':{
            backgroundColor: DarkBrownColor
          }
        }} />
        <GridToolbarExport
          sx={{backgroundColor: DarkBrownColor, color: WhiteColor, px: 1.5, height:35,
            '&:hover':{
              backgroundColor: DarkBrownColor
            }
          }}
          csvOptions={{
            fileName: "Datalogger",
            delimiter: ";",
            utf8WithBom: true,
          }}
          printOptions={{ disableToolbarButton: true }}
        />
        <Button startIcon={<ShowChartOutlined />} onClick={() => navigate(`/mainApp/trendView/${id}`)} sx={{backgroundColor: DarkBrownColor, color: WhiteColor, px: 1.5, height:35, '&:hover':{
            backgroundColor: DarkBrownColor
          }}}>
          Ver Tendencia
        </Button>
        <Box
          component="img"
          src={AnalyticsIcon}
          position={"absolute"}
          right={0}
          alt="Custom Icon"
          sx={{ height: 20, mb:0.7}}
          zIndex={0}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <Paper sx={{ p: 2, borderRadius: 0, backgroundColor: GrayLightColor }}>
      <Box sx={{ p: 1, height:"73vh"}}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5]}
          sx={{
            border: '1px solid #808080', // Adjust border color
            backgroundColor: GrayLightColor,

            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #808080', // Adjust bottom border color of cells
            },

            "& ::-webkit-scrollbar": {
              width: "1px",
              height: "6px"
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: "#F5F5F5"
            },
            "& ::-webkit-scrollbar-thumb": {
              borderRadius: "3px",
              backgroundColor: GrayColor
            },
            "& ::-webkit-scrollbar-corner": {
              // borderRadius: "3px",
              backgroundColor: GrayLightColor
            }

          }}
        />
      </Box>
    </Paper>
  );
}
