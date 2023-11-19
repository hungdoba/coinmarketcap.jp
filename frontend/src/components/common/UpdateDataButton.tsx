import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import TooltipBasicLayout from '../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  updateDataButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main}80`,
      color: theme.palette.text.primary,
    },
  },
}));

const removeList = [
  'coins',
  'globalCoinData',
  'dominanceChart',
  'trendingCoins',
  'companies',
  'bitcoinHashRate',
  'coinListTableColumns',
];

const UpdateDataButton: React.FC = () => {
  const classes = useStyles();

  const reloadDashboard = () => {
    removeList.forEach((item: string) => localStorage.removeItem(item));
    window.location.reload();
  };

  return (
    <TooltipBasicLayout title="Update data">
      <IconButton
        className={classes.updateDataButton}
        onClick={reloadDashboard}
        color="secondary"
      >
        <RefreshRounded />
      </IconButton>
    </TooltipBasicLayout>
  );
};

export default UpdateDataButton;
