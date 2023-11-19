import React from 'react';
import { Coin } from '../../../../models';
import { formatNumber, roundDecimals } from '../../../../common/helpers';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import SmallCoinChart from './SmallCoinChart';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  ranking: {
    textAlign: 'center',
    width: 120,
  },
  listItemAvatar: {
    minWidth: 120,
  },
  avatarSmall: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  coinLabelText: {
    width: 120,
    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
  coinPrice: {
    width: 120,
    textAlign: 'right',
    paddingRight: 12,
    '& .MuiTypography-subtitle2': {
      color: (styleProps: StyleProps) =>
        styleProps.change >= 0
          ? theme.palette.success.main
          : theme.palette.error.main,
    },
    [theme.breakpoints.down('xs')]: {
      width: 160,
    },
  },
  chartWrapper: {
    height: 60,
    maxWidth: 400,
    minWidth: 100,
    width: 'calc(100% - 30px - 46px - 80px - 100px)',
    padding: '0 4px',
  },
}));

interface StyleProps {
  change: number;
}

interface Props {
  coin: Coin;
}

const CoinItem: React.FC<Props> = ({ coin }) => {
  const classes = useStyles({ change: coin.priceChangePercentage24H });
  const navigate = useNavigate();

  return (
    <ListItem disableGutters onClick={() => navigate(`/coins/${coin.id}`)}>
      <div className={classes.ranking}>
        <Typography variant="body2">{coin.marketCapRank}</Typography>
      </div>
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar
          src={coin.image}
          alt={coin.name}
          className={classes.avatarSmall}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.coinLabelText}
        primary={coin.name}
        secondary={`${coin.symbol.toUpperCase()}/USD`}
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
      <div className={classes.chartWrapper}>
        <SmallCoinChart coin={coin} dataKey={'prices'} />
      </div>
      <ListItemText
        className={classes.coinPrice}
        primary={`US$${formatNumber(roundDecimals(coin.currentPrice, 3))}`}
        secondary={`${
          coin.priceChangePercentage24H >= 0 ? '+' : ''
        }${roundDecimals(coin.priceChangePercentage24H)}%`}
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
      <ListItemText
        className={classes.coinPrice}
        primary={'7d'}
        secondary={`${roundDecimals(coin.priceChangePercentage7DInCurrency)} %`}
        primaryTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        secondaryTypographyProps={{ variant: 'subtitle2' }}
      />
    </ListItem>
  );
};

export default CoinItem;
