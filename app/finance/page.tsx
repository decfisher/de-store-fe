'use client';

import { Button, createTheme, Skeleton, ThemeProvider } from '@mui/material';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Customer } from '@/models/customer';
import { CustomerListing } from '@/components/CustomerListing';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
    },
});

export default function Finance() {
    const [customers, setCustomers] = useState<Customer[] | null>(null);

    useEffect(() => {
        fetch('/api/finance/not-approved', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0',
            },
            next: { revalidate: 1 },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching customers');
                }
                return response.json();
            })
            .then(data => {
                // Set small timeout so the loading screen is seen naturally
                setTimeout(() => {
                    setCustomers(data);
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
                    <h1>Manage Finance Approvals</h1>
                    <p>Manage finance requests for customers awaiting approval</p>
                </div>
                <div className={styles.customers}>
                {
                        customers ?
                            (
                                customers.map((customer) => (
                                    <CustomerListing key={customer.id} customer={customer}/>
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