'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Product } from "@/models/product";

export default function ProductListings() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/inventory/products/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching products')
                }
                return response.json()
            })
            .then(data => {
                setProducts(data.products)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    if (isLoading) return (
        <main className={styles.main}>
            Loading...
        </main>
    )

    if (!products) return (
        <main className={styles.main}>
            No product data
        </main>
    )

    return (
        <main className={styles.main}>
            {products.map((product) => (
                <div key={product.id}>
                    <h2>Name: {product.name}</h2>
                    <p>Price: £{product.price}</p>
                </div>
            ))}
        </main>
    );
}
