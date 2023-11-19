import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Coin, Exchange } from '../../../../models';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { shortenNumber } from '../../../../common/helpers';
import ExchangeVolumeDialog from '../atoms/ExchangeVolumeDialog';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.card.paper}`,
    borderRadius: 12,
    '& .MuiCardHeader-content': {
      overflow: 'hidden',
    },
  },
  titleWrapper: {
    '& a': {
      color: theme.palette.text.primary,
    },
  },
  refLink: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  volumeWrapper: {
    width: 'fit-content',
    cursor: 'pointer',
  },
  customTooltipStyles: {
    margin: '4px 0 0',
  },
  trustScoreRank: {
    marginLeft: 10,
    padding: '0 6px',
    borderRadius: 6,
    backgroundColor: theme.palette.card.paper,
  },
  avatarColor: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 4,
    '& .MuiAvatar-img': {
      borderRadius: 8,
    },
  },
}));

interface Props {
  exchange: Exchange;
}

const ExchangeCard: React.FC<Props> = ({ exchange }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const [volumeOpen, setVolumeOpen] = useState<boolean>(false);

  const bitcoin: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'bitcoin';
  });

  const mapTrustColor = () => {
    if (exchange.trustScore > 7) return theme.palette.success.main;
    if (exchange.trustScore > 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const handleLinkClick = async (exchangeId: string, exchangeUrl: string) => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/refLink?exchangeId=${exchange.id.toLowerCase()}`
      );
      if (response.status === 200) {
        const result = await response.json();
        window.open(result, '_blank');
      } else {
        window.open(exchangeUrl);
      }
    } catch (error) {
      console.error('Error fetching final URL:', error);
    }
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea>
        <CardHeader
          onClick={() => handleLinkClick(exchange.name, exchange.url)}
          disableTypography
          title={
            <Box display="flex" alignItems="center">
              <TooltipBasicLayout
                title={`Go to ${exchange.name}`}
                placement="top"
                additionalStyles={classes.customTooltipStyles}
              >
                <Typography
                  variant="h6"
                  noWrap
                  className={classes.titleWrapper}
                >
                  <span className={classes.refLink}>{exchange.name}</span>
                  {/* <Link
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exchange.name}
                  </Link> */}
                </Typography>
              </TooltipBasicLayout>
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.trustScoreRank}
              >
                #{exchange.trustScoreRank}
              </Typography>
            </Box>
          }
          subheader={
            <TooltipBasicLayout
              title="Total Volume (24H)"
              additionalStyles={classes.customTooltipStyles}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
                noWrap
                className={classes.volumeWrapper}
              >
                {bitcoin
                  ? `US$${shortenNumber(
                      exchange.tradeVolume24HBtc * bitcoin.currentPrice
                    )}`
                  : '-'}
              </Typography>
            </TooltipBasicLayout>
          }
          avatar={
            <Avatar
              src={exchange.image}
              alt={exchange.name}
              className={classes.avatarColor}
              variant="rounded"
            />
          }
        />
        <CardContent onClick={() => setVolumeOpen(true)}>
          <Box textAlign="center" paddingBottom="16px">
            <Typography variant="h5" style={{ color: mapTrustColor() }}>
              {exchange.trustScore || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Trust Score
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <ExchangeVolumeDialog
        open={volumeOpen}
        toggleClose={() => setVolumeOpen(false)}
        exchange={exchange}
      />
    </Card>
  );
};

export default ExchangeCard;
