import React from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { useTheme, makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { fNumber, fPercent } from '../utils/formatNumber';
import Text from '../Text';

// ----------------------------------------------------------------------

const useStyles = (color) =>
  makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      ...(theme.palette[color] && {
        color: theme.palette[color].darker,
        backgroundColor: theme.palette[color].lighter,
      }: {}),
    },
    trending: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(0.5),
    },
    trendingIcon: {
      width: 24,
      height: 24,
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    isTrendingDown: {
      color: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.16),
    },
  }));

function StatisticPaper({
  className,
  title = 'Stat',
  color = 'info',
  prefix = '',
  suffix = '',
  right = '',
  data = [],
  countup,
  figure,
  ...other
}) {
  const classes = useStyles(color)();
  const theme = useTheme();
  const length = data.length || 0;

  const hasData = length > 0;

  let PERCENT = 0;
  const FIGURE = data[length - 1] || figure;

  if (data && length > 2) {
    const secondlast = data[length - 2];
    PERCENT = (FIGURE * 100) / secondlast;
  }

  const chartData = [{ data }];
  const chartOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', endingShape: 'rounded' } },
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter(seriesName) {
            return '';
          },
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Paper elevation={3} className={clsx(classes.root, className)} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Text subHeader>{title} </Text>
        <div className={classes.trending}>
          {hasData && (
            <div
              className={clsx(classes.trendingIcon, {
                [classes.isTrendingDown]: PERCENT < 0,
              })}
            >
              <Icon
                width={16}
                height={16}
                icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
              />
            </div>
          )}
          {hasData && (
            <Typography
              component="span"
              variant="subtitle2"
              color={PERCENT >= 0 ? 'primary' : 'error'}
            >
              {PERCENT > 0 && '+'}
              {fPercent(PERCENT)}
            </Typography>
          )}
        </div>

        <Typography variant="h3">
          {countup ? (
            <CountUp
              start={0}
              end={FIGURE}
              duration={4}
              delay={2}
              separator=""
              decimals={2}
              decimal="."
            />
          ) : (
            fNumber(FIGURE)
          )}
        </Typography>
      </Box>

      <React.Fragment>
        <Text subTitle style={{ marginRight: theme.sizes.margin }}>
          {right}
        </Text>
        {hasData && (
          <ReactApexChart
            type="bar"
            series={chartData}
            options={chartOptions}
            width={60}
            height={36}
          />
        )}
      </React.Fragment>
    </Paper>
  );
}

export default StatisticPaper;
