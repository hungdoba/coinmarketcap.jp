import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Chip } from '@mui/material';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import DialogLayout from '../../../templates/DialogLayout';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: '0 8px 8px 0',
  },
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
  handleClickCategory: (category: string) => void;
}

const CoinCategoriesDialog: React.FC<Props> = ({
  open,
  toggleClose,
  handleClickCategory,
}) => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <DialogLayout
      open={open}
      toggleClose={toggleClose}
      title="Categories"
      maxWidth="xs"
    >
      {coinDetails.value && (
        <>
          {coinDetails.value.categories.map((category: string) => (
            <Chip
              key={category}
              className={classes.chip}
              label={category}
              color="primary"
              clickable
              onClick={() => handleClickCategory(category)}
            />
          ))}
        </>
      )}
    </DialogLayout>
  );
};

export default CoinCategoriesDialog;
