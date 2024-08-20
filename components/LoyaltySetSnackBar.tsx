import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Product } from '@/models/product';
import { Alert, CircularProgress } from '@mui/material';
import styles from './snackbar.module.css';
import { formatDiscountCode, formatLoyaltyDiscount } from '@/util/helpers';
import { LoyaltyRecord } from '@/models/loyalty';

interface LoyaltySetSnackBarProps {
    loyaltyRecord: LoyaltyRecord;
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />;
}

export default function LoyaltySetSnackBar({ loyaltyRecord }: LoyaltySetSnackBarProps) {
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

    const handleActivate =
    (
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >,
    ) =>
    () => {
        setLoading(true);
        fetch('/api/loyalty/activate', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: loyaltyRecord.id,
                })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error activating loyalty scheme');
                }

                return response.json();
            })
            .then(data => {
                setAlert(
                    <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
                        Successfully activated {formatLoyaltyDiscount(loyaltyRecord.name)}
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
                        Could not activate {formatLoyaltyDiscount(loyaltyRecord.name)}
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

    const handleDeactivate =
    (
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >,
    ) =>
    () => {
        setLoading(true);
        fetch('/api/loyalty/deactivate', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: loyaltyRecord.id,
                })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deactivating loyalty scheme');
                }

                return response.json();
            })
            .then(data => {
                setAlert(
                    <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
                        Successfully deactivated {formatLoyaltyDiscount(loyaltyRecord.name)}
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
                        Could not deactivate {formatLoyaltyDiscount(loyaltyRecord.name)}
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

    const renderConditionalButton = () => {
        if (loyaltyRecord.active) return (
            <Button onClick={handleDeactivate(SlideTransition)}>Deactivate</Button>
        )

        return (
            <Button onClick={handleActivate(SlideTransition)}>Activate</Button>
        )
    }

    return (
        <div>
            {
                loading ? (
                    <CircularProgress size={30} className={styles.loading}/>
                ) : renderConditionalButton()
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
