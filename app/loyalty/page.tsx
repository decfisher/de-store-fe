'use client';

import { createTheme, Skeleton, ThemeProvider } from '@mui/material';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { LoyaltyRecord } from '@/models/loyalty';
import { formatDateString, formatLoyaltyDiscount } from '@/util/helpers';
import LoyaltySetSnackBar from '@/components/LoyaltySetSnackBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
    },
});

export default function Loyalty() {
    const [loyaltySchemes, setLoyaltySchemes] = useState<LoyaltyRecord[] | null>(null);

    useEffect(() => {
        fetch('/api/loyalty/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0',
            },
            next: { revalidate: 1 },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching loyalty schemes');
                }
                return response.json();
            })
            .then(data => {
                // Set small timeout so the loading screen is seen naturally
                setTimeout(() => {
                    setLoyaltySchemes(data);
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }, []);
    
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.main}>
                <div className={styles.page_header}>
                    <h1>Loyalty</h1>
                    <p>Manage active loyalty schemes available to customers with a loyalty card</p>
                </div>
                <div className={styles.customers}>
                    {
                        loyaltySchemes ?
                            (
                                loyaltySchemes.map((scheme) => (
                                    <div className={styles.loyalty_listing}>
                                        <div>
                                            <h3>{formatLoyaltyDiscount(scheme.name)}</h3>
                                            {
                                                scheme.active ? (
                                                    <div className={styles.active_container}>
                                                        <CheckCircleIcon color='success' fontSize='medium'/>
                                                        <p>Active</p>
                                                    </div>
                                                ) : (
                                                    <div className={styles.inactive_container}>
                                                        <PendingIcon sx={{ color: '#7a7a7a' }} fontSize='medium'/>
                                                        <p>Not Active</p>
                                                    </div> 
                                                )
                                            }     
                                            <p>Last Activated: {formatDateString(scheme.last_active)}</p>
                                        </div>
                                        <LoyaltySetSnackBar loyaltyRecord={scheme}/>
                                    </div>
                                ))
                            ) :
                            (
                                <>
                                    {/* While loading, display skeleton components for product listings */}
                                    <Skeleton variant='rectangular' width={'600px'} height={100} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={100} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={100} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={100} className={styles.skeleton}/>
                                </>
                            )
                    }
                </div>
            </div>
        </ThemeProvider>
    )
}