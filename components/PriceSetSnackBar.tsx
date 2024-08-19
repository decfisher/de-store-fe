import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Product } from '@/models/product';
import { formatToGBP } from '@/util/helpers';
import { Alert, CircularProgress } from '@mui/material';
import styles from './snackbar.module.css';

interface PriceSetSnackBarProps {
  buttonText: string;
  product: Product;
  newPrice: number;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}

export default function PriceSetSnackBar({ buttonText, product, newPrice }: PriceSetSnackBarProps) {
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const [alert, setAlert] = React.useState(
    <Alert severity='info' variant='filled' sx={{ width: '100%' }}>
      Loading...
    </Alert>
  );
  const [loading, setLoading] = React.useState(false);

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >,
    ) =>
    () => {
      setLoading(true);
      fetch('/api/pricing/price/set', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          price: newPrice,
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error setting new price');
          }

          return response.json();
        })
        .then(data => {
          setAlert(
            <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
              Successfully set price of {product.name} to {formatToGBP(newPrice)}
            </Alert>
          );
          setState({
            open: true,
            Transition,
          });
          setLoading(false);
        })
        .catch(error => {
          setAlert(
            <Alert severity='error' variant='filled' sx={{ width: '100%' }}>
              Could not update price of {product.name}
            </Alert>
          );
          setState({
            open: true,
            Transition,
          });
          console.error('Error:', error);
          setLoading(false);
        })
    };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <div>
      {
        loading ? (
          <CircularProgress size={30} className={styles.loading}/>
        ) : (
          <Button onClick={handleClick(SlideTransition)}>{buttonText}</Button>
        )
      }
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        autoHideDuration={3600}
      >
        {alert}
      </Snackbar>
    </div>
  );
}
