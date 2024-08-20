'use client';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styles from './page.module.css';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
    },
});

export default function Inventory() {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.main}>
                <div className={styles.page_header}>
                    <h1>Inventory</h1>
                </div>
                <div className={styles.products}>
                    
                </div>
            </div>
        </ThemeProvider>
    );
}
