import { Product } from "@/models/product";
import PriceSetSnackBar from "./PriceSetSnackBar";
import styles from "./price.module.css";
import { useState } from "react";
import { formatToGBP } from "@/util/helpers";

interface DisplaySetProductPriceProps {
    product: Product;
}

export default function DisplaySetProductPrice({ product }: DisplaySetProductPriceProps) {
    const [value, setValue] = useState<string>('0.00');
    const [hasTyped, setHasTyped] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
    
        // Remove all non-numeric characters except for the decimal point
        input = input.replace(/[^0-9.]/g, '');
    
        // If input starts with a dot (.), prepend a 0
        if (input.startsWith('.')) {
          input = '0' + input;
        }
    
        // If there are multiple dots, remove any after the first
        const parts = input.split('.');
        if (parts.length > 2) {
          input = parts[0] + '.' + parts.slice(1).join('');
        }
    
        // Ensure no more than two digits after the decimal point
        if (parts[1]?.length > 2) {
          input = parts[0] + '.' + parts[1].substring(0, 2);
        }
    
        // Update value
        setValue(input);
    
        // Indicate that the user has typed
        setHasTyped(true);
      };
    
      const handleFocus = () => {
        if (!hasTyped) {
          setValue(''); // Clear the field on focus if the user hasn't typed yet
        }
      };
    
      const handleBlur = () => {
        // Format the value to always show two decimal places on blur
        if (value === '' || value === '.') {
          setValue('0.00');
        } else {
          setValue(parseFloat(value).toFixed(2));
        }
        setHasTyped(false); // Reset hasTyped on blur
      };

    return (
        <div className={styles.product_container}>
            <div className={styles.product_details}>
                <h3>{product.name}</h3>
                <p>Current Price: {formatToGBP(product.price)}</p>
            </div>
            <div>
                <div className={styles.input_product}>
                    <div className={styles.input_text}>
                        <p>£</p>
                        <input value={value} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder="0.00"/>
                    </div>
                    <PriceSetSnackBar buttonText='Set Price' product={product} newPrice={Number(value)}/>
                </div>
            </div>
        </div>
    )
}