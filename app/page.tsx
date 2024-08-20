'use client';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import styles from './page.module.css';
import { Button, CircularProgress, Container, createTheme, Grid, ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { DiscountUsageResponse, LoyaltyUsageResponse, ProductPurchaseResponse, ProductRevenueResponse, TotalRevenueResponse } from '@/models/reporting';
import { formatDiscountCode, formatLoyaltyDiscount, formatToGBP } from '@/util/helpers';
import ErrorIcon from '@mui/icons-material/Error';

const theme = createTheme({
  palette: {
      primary: {
          main: '#333',
      },
  },
});

export default function Home() {
  const [start, setStart] = useState<Dayjs | null>(dayjs(new Date()));
  const [end, setEnd] = useState<Dayjs | null>(dayjs(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [totalRevenue, setTotalRevenue] = useState<TotalRevenueResponse | null>(null);
  const [totalRevenueByProduct, setTotalRevenueByProduct] = useState<ProductRevenueResponse | null>(null);
  const [loyaltyUsage, setLoyaltyUsage] = useState<LoyaltyUsageResponse | null>(null);
  const [mostPopularProducts, setMostPopularProducts] = useState<ProductPurchaseResponse | null>(null);
  const [discountUsage, setDiscountUsage] = useState<DiscountUsageResponse | null>(null);

  const handleGenerate = () => {
    setIsLoading(true);
    setErrorMessage('');

    fetch(`/api/reporting/total-revenue?start=${start}&end=${end}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      next: { revalidate: 1 },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving total revenue');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        setTotalRevenue(data);
        setIsGenerated(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('There was a problem generating your report');
        setIsGenerated(false);
      })

    fetch(`/api/reporting/most-popular-products?start=${start}&end=${end}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      next: { revalidate: 1 },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving popular products');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        setMostPopularProducts(data);
        setIsGenerated(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('There was a problem generating your report');
        setIsGenerated(false);
      })

    fetch(`/api/reporting/total-revenue-by-product?start=${start}&end=${end}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      next: { revalidate: 1 },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving total revenue by product');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        setTotalRevenueByProduct(data);
        setIsGenerated(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('There was a problem generating your report');
        setIsGenerated(false);
      })

    fetch(`/api/reporting/loyalty-usage?start=${start}&end=${end}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      next: { revalidate: 1 },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving loyalty usage');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        setLoyaltyUsage(data);
        setIsGenerated(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('There was a problem generating your report');
        setIsGenerated(false);
      })

    fetch(`/api/reporting/discount-usage?start=${start}&end=${end}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
      next: { revalidate: 1 },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving loyalty usage');
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        setDiscountUsage(data);
        setIsGenerated(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('There was a problem generating your report');
        setIsGenerated(false);
      })
    
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  const renderGeneration = () => {
    return (
      <>
        {
          isGenerated ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1>Total Revenue</h1>
                {
                  totalRevenue!.total_revenue.length === 0 ? (
                    <p>No data</p>
                  ) : (
                    <p>{formatToGBP(totalRevenue?.total_revenue[0].total_revenue!)}</p>
                  )
                }
              </Grid>
              <Grid item xs={6}>
                <h2>Loyalty Usage</h2>
                <div>
                  {
                    loyaltyUsage!.loyalty_usage.length === 0 ? (
                      <p>No data</p>
                    ) : (
                      loyaltyUsage!.loyalty_usage.map((record, index) => (
                        <p key={index}>{formatLoyaltyDiscount(record.loyalty_discount_type)}: {record.count}</p>
                      ))
                    )
                  }
                </div>
              </Grid>
              <Grid item xs={6}>
                <h2>Discount Usage</h2>
                <div>
                  {
                    discountUsage!.discount_usage.length === 0 ? (
                      <p>No data</p>
                    ) : (
                      discountUsage!.discount_usage.map((record, index) => (
                        <p key={index}>{formatDiscountCode(record.discount_type)}: {record.count}</p>
                      ))
                    )
                  }
                </div>
              </Grid>
              <Grid item xs={6}>
                <h2>Most Popular Products (Top 10)</h2>
                <div>
                  {
                    mostPopularProducts!.most_popular_products.length === 0 ? (
                      <p>No data</p>
                    ) : (
                      mostPopularProducts!.most_popular_products.map((record, index) => (
                        <p key={index}>{record.name}: {record.total_purchased}</p>
                      ))
                    )
                  }
                </div>
              </Grid>
              <Grid item xs={6}>
                <h2>Total Revenue By Product (Top 10)</h2>
                <div>
                  {
                    totalRevenueByProduct!.total_revenue_by_product.length === 0 ? (
                      <p>No data</p>
                    ) : (
                      totalRevenueByProduct!.total_revenue_by_product.map((record, index) => (
                        <p key={index}>{record.name}: {formatToGBP(record.total_revenue)}</p>
                      ))
                    )
                  }
                </div>
              </Grid>
            </Grid>
          ) : (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container className={styles.date_picker}>
                  <DateTimePicker
                    label='Start Date'
                    value={start}
                    onChange={(newValue) => setStart(newValue)}
                  />
                  <DateTimePicker
                    label='End Date'
                    value={end}
                    onChange={(newValue) => setEnd(newValue)}
                  />
                </Container>
              </LocalizationProvider>
              <Button onClick={handleGenerate}>Generate Report</Button>
            </>
          )
        }
      </>
    )
  }
  
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.main}>
          <div className={styles.page_header}>
              <h1>Reporting & Analysis</h1>
              {
                isGenerated && !isLoading && start && end ? (
                  <div className={styles.time}>
                    <h3>Report for time period</h3>
                    <p>{dayjs(start).format('DD MMMM YYYY HH:mm')} - {end.format('DD MMMM YYYY HH:mm')}</p>
                  </div>
                ) : (
                  <>
                  </>
                )
              }
              {
                errorMessage ? (
                  <div className={styles.error}>
                    <ErrorIcon color='error' fontSize='medium'/>
                    <p>{errorMessage}</p>
                  </div>
                ) : (
                  <>
                  </>
                )
              }
          </div>
          <div className={styles.content}>
            {
              isLoading ? (
                <div className={styles.loading_container}>
                  <CircularProgress size={25} className={styles.loading}/>
                  <p>Generating Report...</p>
                </div>
              ) : renderGeneration()
            }
          </div>
      </div>
    </ThemeProvider>
  );
}
