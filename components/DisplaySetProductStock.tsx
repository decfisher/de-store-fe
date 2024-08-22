import { Product } from '@/models/product';
import styles from './price.module.css';
import { useState } from 'react';
import StockSetSnackBar from './StockSetSnackBar';

interface DisplaySetProductStockProps {
    product: Product;
}

export default function DisplaySetProductStock({ product }: DisplaySetProductStockProps) {
    const [value, setValue] = useState<string>('0');
    const [hasTyped, setHasTyped] = useState<boolean>(false);

    const sanitizeInput = (input: string): string => {
        // Remove any alphabetic characters
        let sanitized = input.replace(/[a-zA-Z]/g, '');

        // Remove any decimals
        sanitized = sanitized.replace(/\./g, '');

        // Handle multiple '-' characters
        sanitized = sanitized.replace(/-/g, '');
        if (input.includes('-')) {
            sanitized = '-' + sanitized;
        }

        // Check if the result is a valid whole number (integer)
        if (/^-?\d+$/.test(sanitized)) {
            return sanitized;
        }

        return '0';
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const sanitizedValue = sanitizeInput(rawValue);
        setValue(sanitizedValue);
        setHasTyped(true);
    };
    
    const handleFocus = () => {
        if (!hasTyped) {
            setValue('0'); // Clear the field on focus if the user hasn't typed yet
        }
    };

    return (
        <div className={styles.product_container}>
            <div className={styles.product_details}>
                <h3>{product.name}</h3>
                <p>Current Stock: {product.quantity}</p>
            </div>
            <div>
                <div className={styles.input_product}>
                    <div className={styles.input_text}>
                        <input value={value} onChange={handleChange} onFocus={handleFocus} placeholder='0' type={'number'} style={{ height: '24px', width: 'auto', maxWidth: '100px', fontSize: '18px' }}/>
                    </div>
                    <StockSetSnackBar buttonText='Update Stock' product={product} newStock={Number(value)}/>
                </div>
            </div>
        </div>
    )
}