import { getTodayDate } from '../../../../common/helpers';
import { selectCoins } from '../../../../features/coinsSlice';
import { Coin } from '../../../../models';
import {
  fetchCoinMarketChartList,
  selectCoinMarketChartList,
} from '../../../../features/coinMarketChartListSlice';
import CardLayout from '../../../templates/CardLayout';
import { useTheme } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import {
  Box,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import ListItemSkeleton from '../../../skeletons/ListItemSkeleton';
import CoinItem from '../organisms/CoinItem';
import { ArrowForwardIosRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../../app/reduxHooks';

const useStyles = makeStyles((theme: Theme) => ({
  coinList: {
    flex: 1,
    overflow: 'scroll',
  },
  viewMore: {
    padding: 8,
    color: theme.palette.text.secondary,
    '& .MuiSvgIcon-root': {
      fontSize: '1em',
      marginLeft: 4,
    },
  },
}));

const TopCoinsCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  const top15: Coin[] = coins.value.slice(0, 15);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartList.value[1]).length === 0 &&
      coinMarketChartList.status === 'IDLE'
    ) {
      dispatch(
        fetchCoinMarketChartList({
          coinIdList: top15.map((coin: Coin) => coin.id),
          dayRange: 1,
        })
      );
    }
  }, [dispatch, top15, coinMarketChartList.value, coinMarketChartList.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Top Cryptocurrencies"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
        {top15.length === 0 || coins.status === 'LOADING' ? (
          <ListItemSkeleton count={15} height={69} iconDimensions={4} />
        ) : (
          <>
            {top15.map((coin: Coin, index: number) => {
              return (
                <Fragment key={coin.id}>
                  <CoinItem coin={coin} />
                  {index < coins.value.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </>
        )}
        <ListItem onClick={() => navigate('/coins')}>
          <ListItemText
            className={classes.viewMore}
            primary={
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle2">View All</Typography>
                <ArrowForwardIosRounded />
              </Box>
            }
          />
        </ListItem>
      </List>
    </CardLayout>
  );
};

export default TopCoinsCard;
