import Link from 'next/link';
import styles from './page.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function Pricing() {
    return (
        <div className={styles.main}>
            <div className={styles.page_header}>
                <h1>Pricing</h1>
                <p>Manage pricing, discount and delivery for products</p>
            </div>
            <div className={styles.buttons}>
                <Link href='/pricing/prices' className={styles.link}>
                    <AttachMoneyIcon fontSize='large'/>
                    <p>Update Prices</p>
                </Link>
                <Link href='/pricing/discount' className={styles.link}>
                    <CardGiftcardIcon fontSize='large'/>
                    <p>Update Discounts</p>
                </Link>
            </div>
        </div>
    )
}