'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Product } from '@/models/product';
import Link from 'next/link';
import { formatDiscountCode, formatToGBP } from '@/util/helpers';
import { CircularProgress, createTheme, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
    },
});

export default function ProductListings() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/inventory/products/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            next: { revalidate: 0 },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            })
    }, []);

    function createData(
        name: string,
        price: number,
        discount: string,
        quantity: number,
        updatedAt: Date,
    ) {
        return { name, price, discount, quantity, updatedAt, };
    }
      
    function renderTable() {
        if (isLoading) return (
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', }}>
                <CircularProgress size={35}/>
                <p style={{ fontSize: '18px', paddingLeft: '1rem', }}>Loading...</p>
            </div>
        )
    
        if (!products) return (
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', }}>
                <ProductionQuantityLimitsIcon sx={{ fontSize: '3em', paddingRight: '1rem', }}/>
                <p style={{ fontSize: '18px', }}>No products found</p>
            </div>
        )

        const rows = products.map((product) => {
            return createData(
                product.name,
                product.price,
                product.discount,
                product.quantity,
                product.updatedAt,
            )
        })

        return (
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label='inventory'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', }}>Product</TableCell>
                            <TableCell align='right' sx={{ fontWeight: 'bold', }}>Current Stock</TableCell>
                            <TableCell align='right' sx={{ fontWeight: 'bold', }}>Current Price</TableCell>
                            <TableCell align='right' sx={{ fontWeight: 'bold', }}>Discount</TableCell>
                            <TableCell align='right' sx={{ fontWeight: 'bold', }}>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='right'>{row.quantity}</TableCell>
                                <TableCell align='right'>{formatToGBP(row.price)}</TableCell>
                                <TableCell align='right'>{formatDiscountCode(row.discount)}</TableCell>
                                <TableCell align='right'>{dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <main className={styles.main}>
                <div className={styles.backbtn}>
                    <Link href='/inventory'>Back</Link>
                </div>
                <div className={styles.page_header}>
                    <h1>All Products</h1>
                </div>
                {renderTable()}
            </main>
        </ThemeProvider>
    );
}
