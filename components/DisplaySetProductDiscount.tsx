import { Product } from '@/models/product';
import styles from './price.module.css';
import { useState } from 'react';
import { formatDiscountCode, formatToGBP } from '@/util/helpers';
import DiscountSetSnackBar from './DiscountSetSnackBar';

interface DisplaySetProductDiscountProps {
    product: Product;
}

export default function DisplaySetProductDiscount({ product }: DisplaySetProductDiscountProps) {
    const [value, setValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles.product_container_lg}>
            <div className={styles.product_details}>
                <h3>{product.name}</h3>
                <p>Current Price: {formatToGBP(product.price)}</p>
                <p>Current Discount Offer: {formatDiscountCode(product.discount)}</p>
                <p>Current Stock: {product.quantity}</p>
            </div>
            <div className={styles.select_input}>
                <div className={styles.input_discount}>
                    <div>
                        <select value={value} onChange={handleSelectChange}>
                            <option disabled selected value={''}>-- Select Discount --</option>
                            <option value={'NONE'}>None</option>
                            <option value={'BOGOF'}>Buy One Get One Free</option>
                            <option value={'THREE_FOR_TWO'}>3 for 2</option>
                            <option value={'FREE_DELIVERY'}>Free Delivery</option>
                        </select>
                    </div>
                    <div>
                        <DiscountSetSnackBar buttonText={'Set Discount'} product={product} newDiscount={value}/>
                    </div>
                </div>
            </div>
        </div>
    )
}