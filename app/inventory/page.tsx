import styles from './page.module.css';
import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Link from 'next/link';

export default function Pricing() {
    return (
        <div className={styles.main}>
            <div className={styles.page_header}>
                <h1>Inventory</h1>
                <p>Manage and view stock for products</p>
            </div>
            <div className={styles.buttons}>
                <Link href='/inventory/all' className={styles.link}>
                    <InventoryIcon fontSize='large'/>
                    <p>View Inventory</p>
                </Link>
                <Link href='/inventory/adjust-stock' className={styles.link}>
                    <ContentPasteIcon fontSize='large'/>
                    <p>Update Stock</p>
                </Link>
            </div>
        </div>
    )
}
