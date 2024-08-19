import { Customer } from '@/models/customer';
import { Button, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import styles from './customer.module.css';
import { useState } from 'react';

interface CustomerListingProps {
    customer: Customer;
}

export function CustomerListing({ customer }: CustomerListingProps) {
    const [decision, setDecision] = useState<boolean | null>(null)
    const [loading, isLoading] = useState(false);

    const handleFinanceApproval = () => {
        isLoading(true);
        fetch(`/api/finance/get-decision/${customer.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0',
            },
            next: { revalidate: 1 },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error approving finance');
                }

                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    setDecision(data.financeDesicion);
                    isLoading(false);
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                isLoading(false);
            })
    }

    const render = () => {
        if (loading) return (
            <div className={styles.loading_container}>
                <CircularProgress size={25} className={styles.loading}/>
                <p>Contacting Enabling...</p>
            </div>
        )

        if (decision === null) return (
            <Button onClick={handleFinanceApproval}>Request Approval</Button>
        )

        return (
            decision ? (
                <div className={styles.success_container}>
                    <CheckCircleOutlineIcon color='success' fontSize='medium' className={styles.icon}/>
                    <p>Approved</p>
                </div>
            ) : (
                <div className={styles.failure_container}>
                    <CancelOutlinedIcon color='error' fontSize='medium' className={styles.icon}/>
                    <p>Rejected</p>
                </div>
            )
        )
    }

    return (
        <div className={styles.customer_container}>
            <h3>{customer.email}</h3>
            {render()}
        </div>
    )
}