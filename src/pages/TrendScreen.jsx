import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Box, Button, Divider, Grid, Modal, Paper, Stack } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { BarChartOutlined, MultilineChartOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { urlRest } from "../utils/utildata";
import { useState } from "react";
import TransferList from "../components/TransferList/TransferList";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function TrendScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [SeriesTrend, setSeriesTrend] = useState([]);
  const [variableList, setVariableList] = useState({
    left: [
      {
        value: 0,
        label: "RPM Motor",
      },
      {
        value: 1,
        label: "RPM Varilla",
      },
      {
        value: 2,
        label: "RPM Motor Backspin",
      },
      {
        value: 3,
        label: "RPM Varilla Backspin",
      },
      {
        value: 4,
        label: "Torque",
      },
      {
        value: 806,
        label: "Frecuencia",
      },
      {
        value: 807,
        label: "Voltaje RMS entre fases A y B",
      },
      {
        value: 808,
        label: "Voltaje RMS entre fases B y C",
      },
      {
        value: 809,
        label: "Voltaje RMS entre fases A y C",
      },
      {
        value: 810,
        label: "Voltaje RMS de Fase A",
      },
      {
        value: 811,
        label: "Voltaje RMS de Fase B",
      },
      {
        value: 812,
        label: "Voltaje RMS de Fase C",
      },
      {
        value: 813,
        label: "Voltaje RMS de Neutro",
      },
      {
        value: 814,
        label: "Desbalance de Voltaje",
      },
      {
        value: 815,
        label: "Intensidad RMS de la fase A",
      },
      {
        value: 816,
        label: "Intensidad RMS de la fase B",
      },
      {
        value: 817,
        label: "Intensidad RMS de la fase C",
      },
      {
        value: 818,
        label: "Intensidad RMS del Neutro",
      },
      {
        value: 819,
        label: "Intensidad RMS Total",
      },
      {
        value: 820,
        label: "Desbalance de Corriente",
      },
      {
        value: 821,
        label: "Intensidad RMS de la fase A",
      },
      {
        value: 822,
        label: "Intensidad RMS de la fase B",
      },
      {
        value: 823,
        label: "Intensidad RMS de la fase C",
      },
      {
        value: 824,
        label: "Intensidad RMS del Neutro",
      },
      {
        value: 825,
        label: "Intensidad RMS Total",
      },
      {
        value: 826,
        label: "Desbalance de Corriente",
      },
      {
        value: 827,
        label: "Potencia Aparente de la Fase A",
      },
      {
        value: 828,
        label: "Potencia Aparente de la Fase B",
      },
      {
        value: 829,
        label: "Potencia Aparente de la Fase C",
      },
      {
        value: 830,
        label: "Potencia Aparente Total",
      },
      {
        value: 831,
        label: "Potencia Aparente de la Fase A",
      },
      {
        value: 832,
        label: "Potencia Aparente de la Fase B",
      },
      {
        value: 833,
        label: "Potencia Aparente de la Fase C",
      },
      {
        value: 834,
        label: "Potencia Aparente Total",
      },
    ],
    right: [],
  });
  const [Categories, setCategories] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function fetchValues(seriesName = []) {
    if (seriesName.length <= 0) { return; }

    fetch(urlRest + "/api/vfd/getDeviceData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) => response.json())
      .then((data) => {
        const now = moment(Date.now()).valueOf(); 
        const oneDayAgo = moment(Date.now()).subtract(1, "day").valueOf(); 
        let arrAux = [],
        arrCategories = [],
        seriesObj = {},
        seriesArr = [];

        seriesName.forEach((series, i) => {
          data.reads.forEach((read, recordId) => {
            if (read.Timestamp >= oneDayAgo && read.Timestamp <= now ) {
              seriesArr.push(read[series.value]);
              arrCategories.push(
                moment(read["Timestamp"]).format("DD/MM/YYYYY HH:mm:ss")
              );
            }
          });
          seriesObj = {
            name: series.label,
            data: seriesArr,
          };
          arrAux.push(seriesObj);
          seriesArr = [];
          // arrCategories = [];
        });
  
        setSeriesTrend(arrAux);
        setCategories(arrCategories);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const options = {
    chart: {
      type: "line", // or 'column', 'pie', etc.
      zoomType: 'x',
    },
    title: {
      text: "SPDrive Chart Module",
    },
    xAxis: {
      categories: Categories, // Categorías del eje X
      crosshair: {
        width: 50, // Ancho del puntero del eje X
      },
    },
    tooltip: {
      shared: true, // Mostrar tooltip compartido para todas las series
    },
    series: SeriesTrend,
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button onClick={()=>navigate(-1)} startIcon={<ChevronLeft />}>
          Regresar
        </Button>
        <Button onClick={handleOpen} startIcon={<BarChartOutlined />}>
          Seleccionar Variables
        </Button>
      </Stack>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TransferList
            leftList={variableList.left}
            rightList={variableList.right}
            onChange={(list) => {
              setVariableList(list);
            }}
            leftListTitle="Variables Disponibles"
            rightListTitle="Variables Seleccionadas"
          />
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  fetchValues(variableList.right);
                }}
              >
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Paper>
  );
}

//Si la vida fuera estable todo el tiempo, yo no bebería ni malgastaría la plata. Pero me doy cuenta que la vida es un juego y antes de morir es mejor aprovecharla