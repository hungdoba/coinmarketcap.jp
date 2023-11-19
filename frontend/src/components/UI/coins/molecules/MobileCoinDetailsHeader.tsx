import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Button, LinearProgress, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { formatNumber, roundDecimals } from '../../../../common/helpers';
import DialogLayout from '../../../templates/DialogLayout';
import CoinPriceStatistics from '../atoms/CoinPriceStatistics';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  avatarLarge: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    marginRight: 16,
  },
  priceChange: {
    marginLeft: 12,
  },
  progressBar: {
    margin: '0 8px',
    borderRadius: 12,
    height: 6,
    width: 100,
    '& .MuiLinearProgress-bar': {
      borderRadius: 12,
    },
  },
  moreInfoButton: {
    width: '100%',
  },
  gotoButton: {
    margin: '10px 0 0 0',
    width: '100%',
    backgroundColor: '#FF5722',
    color: 'white',
  },
  dialogPadding: {
    padding: 0,
  },
}));

const MobileCoinDetailsHeader: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);
  const [open, setOpen] = useState<boolean>(false);

  const calculateProgress = (current: number, low: number, high: number) => {
    if (current <= low) return 0;
    if (current >= high) return 100;
    return ((current - low) / (high - low)) * 100;
  };

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Box padding={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Avatar
              src={coinDetails.value.image.large}
              alt={coinDetails.value.name}
              className={classes.avatarLarge}
            />
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">{coinDetails.value.name}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">
                  ${formatNumber(coinDetails.value.marketData.currentPrice.usd)}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.priceChange}
                  style={{
                    color:
                      coinDetails.value.marketData.priceChangePercentage24H >= 0
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {coinDetails.value.marketData.priceChangePercentage24H >= 0
                    ? '+'
                    : ''}
                  {roundDecimals(
                    coinDetails.value.marketData.priceChangePercentage24H
                  )}
                  %
                </Typography>
              </Box>
            </Box>
          </Box>
          {coinDetails.value.marketData.low24H.usd &&
            coinDetails.value.marketData.high24H.usd && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="18px"
              >
                <Typography variant="subtitle2" color="textSecondary" noWrap>
                  Low: $
                  {formatNumber(
                    Math.min(
                      coinDetails.value.marketData.low24H.usd,
                      coinDetails.value.marketData.currentPrice.usd
                    )
                  )}
                </Typography>
                <LinearProgress
                  className={classes.progressBar}
                  variant="determinate"
                  color="secondary"
                  value={calculateProgress(
                    coinDetails.value.marketData.currentPrice.usd,
                    coinDetails.value.marketData.low24H.usd,
                    coinDetails.value.marketData.high24H.usd
                  )}
                />
                <Typography variant="subtitle2" color="textSecondary" noWrap>
                  High: $
                  {formatNumber(
                    Math.max(
                      coinDetails.value.marketData.high24H.usd,
                      coinDetails.value.marketData.currentPrice.usd
                    )
                  )}
                </Typography>
              </Box>
            )}
          <Button
            className={classes.moreInfoButton}
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            More Data
          </Button>
          <Link to="/exchanges">
            <Button
              className={classes.gotoButton}
              variant="contained"
              color="secondary"
            >
              Trading Now
            </Button>
          </Link>

          <DialogLayout
            open={open}
            toggleClose={() => setOpen(false)}
            title={`${coinDetails.value.name} Price Statistics`}
            {...{ className: classes.dialogPadding }}
          >
            <CoinPriceStatistics hideTitle />
          </DialogLayout>
        </Box>
      ) : (
        <Box padding={3}>
          <Box display="flex" alignItems="center" marginBottom="12px">
            <Skeleton variant="circular" className={classes.avatarLarge} />
            <Box>
              <Skeleton height={32} width={120} />
              <Skeleton height={32} width={100} />
            </Box>
          </Box>
          <Box marginBottom="18px">
            <Skeleton height={21} width={200} />
          </Box>
          <Button
            className={classes.moreInfoButton}
            variant="contained"
            color="secondary"
            disabled
          >
            More Data
          </Button>
          <Link to="/exchanges">
            <Button
              className={classes.gotoButton}
              variant="contained"
              color="secondary"
            >
              Trading Now
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default MobileCoinDetailsHeader;
