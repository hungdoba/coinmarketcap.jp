import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { formatNumber, roundDecimals } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  coinDetailsHeader: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  avatarLarge: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    marginRight: 16,
  },
  gutterBottom: {
    marginBottom: 6,
  },
  coinSymbol: {
    marginLeft: 16,
    padding: '0 6px',
    borderRadius: 6,
    backgroundColor: theme.palette.card.paper,
  },
  link: {
    margin: '0 12px 0 2px',
    color: theme.palette.text.secondary,
  },

  chip: {
    marginTop: 12,
    marginRight: 8,
  },
  chipSpecial: {
    margin: '0 12px 0 2px',
    padding: '0 8px',
    backgroundColor: '#FF5722',
    color: 'white',
  },
  priceChange: {
    marginLeft: 16,
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
}));

const CoinDetailsHeader: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);

  console.log(coinDetails);

  const calculateProgress = (current: number, low: number, high: number) => {
    if (current <= low) return 0;
    if (current >= high) return 100;
    return ((current - low) / (high - low)) * 100;
  };

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Box display="flex" justifyContent="space-between" padding={3}>
          <Box display="flex" alignItems="center">
            <Avatar
              src={coinDetails.value.image.large}
              alt={coinDetails.value.name}
              className={classes.avatarLarge}
            />
            <Box>
              <Box display="flex" alignItems="center" marginBottom="6px">
                <Typography variant="h4" marginRight="4px">
                  {coinDetails.value.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.coinSymbol}
                >
                  {coinDetails.value.symbol.toUpperCase()}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                marginTop="-12px"
              >
                <Box display="flex" alignItems="center" marginTop="12px">
                  {coinDetails.value.links.homepage[0] && (
                    <Typography variant="body1" className={classes.link}>
                      <Link
                        href={coinDetails.value.links.homepage[0]}
                        target="_blank"
                        marginRight="8px"
                        underline="none"
                        rel="noopener noreferrer"
                      >
                        Website
                      </Link>
                    </Typography>
                  )}
                  {coinDetails.value.links.blockchainSite[0] && (
                    <Typography variant="body1" className={classes.link}>
                      <Link
                        href={coinDetails.value.links.blockchainSite[0]}
                        underline="none"
                        marginRight="8px"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Blockchain
                      </Link>
                    </Typography>
                  )}
                  {coinDetails.value.links.officialForumUrl[0] && (
                    <Typography variant="body1" className={classes.link}>
                      <Link
                        href={coinDetails.value.links.officialForumUrl[0]}
                        marginRight="8px"
                        underline="none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Forum
                      </Link>
                    </Typography>
                  )}
                  <Link href="/exchanges">
                    <Chip
                      className={classes.chipSpecial}
                      label="Trading Now"
                      size="small"
                      clickable
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                marginBottom="6px"
              >
                <Typography variant="h4">
                  ${formatNumber(coinDetails.value.marketData.currentPrice.usd)}
                </Typography>
                <Typography
                  variant="h6"
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
              {coinDetails.value.marketData.low24H.usd &&
                coinDetails.value.marketData.high24H.usd && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      noWrap
                    >
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
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      noWrap
                    >
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
            </Box>
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" padding={3}>
          <Skeleton variant="circular" className={classes.avatarLarge} />
          <Box>
            <Skeleton
              height={41}
              width={250}
              className={classes.gutterBottom}
            />
            <Skeleton height={24} width={350} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CoinDetailsHeader;
