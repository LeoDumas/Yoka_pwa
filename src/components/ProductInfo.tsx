import React from 'react';
import { ProductData } from '../types';
import ProductDetails from './ProductDetails';

interface ProductInfoProps {
    productData: ProductData;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productData }) => {
    return (
        <div className="container mx-auto px-4">
            <ProductDetails productData={productData} />
        </div>
    );
};

export default ProductInfo;
