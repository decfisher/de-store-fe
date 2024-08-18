import Link from "next/link";
import styles from "./page.module.css";

export default function Delivery() {
    return (
        <div className={styles.main}>
            <div className={styles.backbtn}>
                <Link href='/pricing'>Back</Link>
            </div>
            <div className={styles.page_header}>
                <h1>Update Delivery Charge</h1>
                <p>Update delivery charges for customers</p>
            </div>
            {/* <div className={styles.buttons}>
                <button>Update prices</button>
                <button>Update discounts</button>
                <button>Update delivery charge</button>
            </div> */}
        </div>
    )
}