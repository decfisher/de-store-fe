import Link from 'next/link';
import styles from './navbar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.navbar_container}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href='/'>DE-Store Management</Link>
                </div>
                <ul className={styles.nav_links}>
                    <li><Link href='/'>Reporting</Link></li>
                    <li><Link href='/inventory'>Inventory</Link></li>
                    <li><Link href='/pricing'>Pricing</Link></li>
                    <li><Link href='/finance'>Finance</Link></li>
                    <li><Link href='/loyalty'>Loyalty</Link></li>
                </ul>
            </div>
        </nav>
    )
}