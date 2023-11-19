import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  fetchExchangeVolumeChart,
  selectExchangeVolumeChart,
} from '../../../../features/exchangeVolumeChartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/reduxHooks';
import { toggleButtonsHeight } from '../../../../common/shared/dimensions';
import {
  convertTimestamp,
  formatNumber,
  formatTimestampToTimeString,
  roundDecimals,
} from '../../../../common/helpers';
import ExchangeVolumeChartToggle from './ExchangeVolumeChartToggle';
import ChartSkeleton from '../../../skeletons/ChartSkeleton';
import { Exchange } from '../../../../models';
import DialogLayout from '../../../templates/DialogLayout';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    padding: '16px 0 24px',
    height: 400,
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: 290,
    },
  },
  responsiveContainer: {
    '& .recharts-surface': {
      cursor: 'pointer',
    },
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
    '& .MuiTypography-root:nth-child(2)': {
      color: theme.palette.secondary.main,
    },
    '& .MuiTypography-root:nth-child(3)': {
      color: theme.palette.primary.main,
    },
  },
}));

interface DataFormat {
  date: number;
  value: number;
}

interface Props {
  open: boolean;
  toggleClose: () => void;
  exchange: Exchange;
}

const ExchangeVolumeDialog: React.FC<Props> = ({
  open,
  toggleClose,
  exchange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const exchangeVolumeChart = useAppSelector(selectExchangeVolumeChart);

  console.log(exchangeVolumeChart);

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    exchangeVolumeChart.value.forEach((dataPair: [number, string]) => {
      chartData.push({ date: dataPair[0], value: Number(dataPair[1]) });
    });
    return chartData;
  };

  const [refLink, setRefLink] = useState(exchange.url);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/refLink?exchangeId=${exchange.id.toLowerCase()}`
      );
      if (response.status === 200) {
        const result = await response.json();
        setRefLink(result);
      }
    };

    if (open) {
      dispatch(
        fetchExchangeVolumeChart({
          exchangeId: exchange.id,
          dayRange: exchangeVolumeChart.selectedDayRange,
        })
      );
      fetchData();
    }
  }, [dispatch, exchange.id, exchangeVolumeChart.selectedDayRange, open]);

  return (
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title={`${exchange.name} Trading Volume`}
      refLink={refLink}
      {...{ className: classes.chartWrapper }}
    >
      <ExchangeVolumeChartToggle />
      {exchangeVolumeChart.status === 'LOADING' ? (
        <ChartSkeleton />
      ) : (
        <>
          {exchangeVolumeChart.status === 'FAILED' ? (
            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="body2" color="textSecondary">
                No Data Available
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer
              height="100%"
              width="100%"
              className={classes.responsiveContainer}
            >
              <AreaChart
                data={formatRawData()}
                margin={{
                  top: Number(toggleButtonsHeight + theme.spacing(3)),
                  right: 0,
                  left: 0,
                  bottom: Number(theme.spacing(3)),
                }}
              >
                <defs>
                  <linearGradient
                    id="chart-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => convertTimestamp(tick)}
                  hide
                />
                <YAxis
                  domain={[
                    (dataMin: number) => dataMin * 0.99,
                    (dataMax: number) => dataMax * 1.01,
                  ]}
                  hide
                />
                <Tooltip
                  cursor={{ stroke: theme.palette.text.secondary }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Box className={classes.customTooltip}>
                          <Typography variant="body1">
                            {convertTimestamp(label, true)}
                          </Typography>
                          <Typography variant="body2">
                            {formatTimestampToTimeString(label)}
                          </Typography>
                          <Typography variant="body2">
                            {`Total Volume: US${formatNumber(
                              roundDecimals(payload[0].payload.value)
                            )}`}
                          </Typography>
                        </Box>
                      );
                    } else {
                      return null;
                    }
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  dot={false}
                  animationDuration={3000}
                  strokeWidth={2}
                  stroke={theme.palette.primary.main}
                  fillOpacity={1}
                  fill={`url(#chart-gradient)`}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </DialogLayout>
  );
};

export default ExchangeVolumeDialog;
