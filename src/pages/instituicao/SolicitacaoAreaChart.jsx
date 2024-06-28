import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function SolicitacaoAreaChart({ slot }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series, setSeries] = useState([
    {
      name: 'Aceitas',
      data: [0, 86, 28, 115, 48, 210, 136]
    },
    {
      name: 'Pendentes',
      data: [0, 43, 14, 56, 24, 105, 68]
    },
    {
      name: 'Recusadas',
      data: [0, 23, 4, 15, 34, 67, 10]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Aceitas',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
      },
      {
        name: 'Pendentes',
        data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
      },
      {
        name: 'Recusadas',
        data: [10, 0, 20, 15, 6, 3, 9, 45, 9, 2, 4, 8]
      }
    ]);
  }, []);

  return <ReactApexChart options={options} series={series} type="bar" height={450} />;
}

SolicitacaoAreaChart.propTypes = { slot: PropTypes.string };
