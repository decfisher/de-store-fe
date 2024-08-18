import Link from "next/link";
import styles from "./page.module.css";

export default function Pricing() {
    return (
        <div className={styles.main}>
            <div className={styles.page_header}>
                <h1>Pricing</h1>
                <p>Manage pricing, discount and delivery for products</p>
            </div>
            <div className={styles.buttons}>
                <Link href="/pricing/prices">
                    <button>Update prices</button>
                </Link>
                <Link href="/pricing/discount">
                    <button>Update discounts</button>
                </Link>
                <Link href="/pricing/delivery">
                    <button>Update delivery charge</button>
                </Link>
            </div>
        </div>
    )
}