'use client';

import Link from 'next/link';
import styles from './page.module.css';
import React, { useEffect, useState } from 'react';
import { Product } from '@/models/product';
import { createTheme, Skeleton, ThemeProvider } from '@mui/material';
import DisplaySetProductStock from '@/components/DisplaySetProductStock';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
    },
});

export default function Stock() {
    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        fetch('/api/inventory/products/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0',
            },
            next: { revalidate: 1 },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                return response.json();
            })
            .then(data => {
                // Set small timeout so the loading screen is seen naturally
                setTimeout(() => {
                    setProducts(data);
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }, []);
    
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.main}>
                <div className={styles.backbtn}>
                    <Link href='/inventory'>Back</Link>
                </div>
                <div className={styles.page_header}>
                    <h1>Adjust Stock</h1>
                    <p>Manage current stock values for products</p>
                </div>
                <div className={styles.products}>
                    {
                        products ?
                            (
                                products.map((product) => (
                                    <DisplaySetProductStock key={product.id} product={product}/>
                                ))
                            ) :
                            (
                                <>
                                    {/* While loading, display skeleton components for product listings */}
                                    <Skeleton variant='rectangular' width={'600px'} height={98} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={98} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={98} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={98} className={styles.skeleton}/>
                                    <Skeleton variant='rectangular' width={'600px'} height={98} className={styles.skeleton}/>
                                </>
                            )
                    }
                </div>
            </div>
        </ThemeProvider>
    )
}