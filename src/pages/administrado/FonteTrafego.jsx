import PropTypes from 'prop-types';

// material-ui
import React from 'react';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// assets
import DesktopOutlined from '@ant-design/icons/DesktopOutlined';
import MobileOutlined from '@ant-design/icons/MobileOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';

// terceiros
import ReactApexChart from 'react-apexcharts';

// project import
import MainCard from '../../components/MainCard';

const iconMapping = { Desktop: DesktopOutlined, Tablet: MobileOutlined, Phone: PhoneOutlined };

export default function FonteTrafego({ chartSeries, labels, sx }) {
    const chartOptions = useChartOptions(labels);

    return (
        <Stack mt={1} justifyContent="space-between" >
            <Typography variant="h5">Fonte tráfego</Typography>

            <MainCard content={false} sx={{ mt: 1.5, height: 470 }} >
                <Box sx={{ pt: 4, pr: 2 }}>
                    <ReactApexChart options={chartOptions} series={chartSeries} type="donut" />
                </Box>

                <Stack direction="row" alignItems="center" spacing={2} justifyContent='center'>
                    {chartSeries.map((item, index) => {
                        const label = labels[index];
                        const Icon = iconMapping[label];

                        return (
                            <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                                {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}

                                <Typography variant="h6">{label}</Typography>

                                <Typography color="text.secondary" variant="subtitle2">
                                    {item}%
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </MainCard>
        </Stack>
    );
}

FonteTrafego.propTypes = {
    chartSeries: PropTypes.array,
    labels: PropTypes.array,
    sx: PropTypes.any
};

function useChartOptions(labels) {
    const theme = useTheme();

    return {
        chart: { background: 'transparent' },
        colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
        dataLabels: { enabled: false },
        labels,
        legend: { show: false },
        plotOptions: { pie: { expandOnClick: false } },
        states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
        stroke: { width: 0 },
        theme: { mode: theme.palette.mode },
        tooltip: { fillSeriesColor: false },
    };
}