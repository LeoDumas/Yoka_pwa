import React from 'react';
import { FaBolt, FaFire, FaLeaf, FaEgg, FaBacon, FaCubes, FaCookie } from 'react-icons/fa';
import { ProductData } from '../types';
import { getNutriScoreColor, getScoreColor } from '../utils/colorUtils';

interface ProductDetailsProps {
    productData: ProductData;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productData }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-0">
                <img className="h-48 object-contain md:w-48 mb-4 md:mb-0 md:mr-6" src={productData.product.image_url} alt={`product-image-${productData.product.abbreviated_product_name || productData.product.product_name}`}/>
                <div className="flex flex-col justify-center">
                    <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-left">
                        {productData.product.abbreviated_product_name || productData.product.product_name}
                    </h2>
                    <p className="mt-2 text-black/45 text-sm text-center md:text-left">{productData.product.brands}</p>
                    <p className={`mt-2 text-center md:text-left ${getScoreColor(productData.product.nutriscore_data.score)}`}>
                        Score : {productData.product.nutriscore_data.score}/100
                    </p>
                    <p className={`mt-2 text-center md:text-left ${getNutriScoreColor(productData.product.nutriscore_data.grade)}`}>
                        Nutri-Score : {productData.product?.nutriscore_data?.grade?.toUpperCase() || "Non disponible"}
                    </p>
                </div>
            </div>

            <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400 md:hidden" />

            <div className="text-black text-xl md:text-2xl px-6 md:pl-12">
                <p className="mt-2 flex items-center gap-x-2">
                    <FaBolt className="mr-2" />
                    Énergie : {productData.product.nutriscore_data.energy}Kj
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaFire className="mr-2" />
                    Kcal : {(productData.product.nutriscore_data.energy / 4.184).toFixed(2)}Kcal
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaLeaf className="mr-2" />
                    Fibres : {productData.product.nutriscore_data.fiber}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaEgg className="mr-2" />
                    Protéines : {productData.product.nutriscore_data.proteins}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaBacon className="mr-2" />
                    Graisses saturées : {productData.product.nutriscore_data.saturated_fat}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaCubes className="mr-2" />
                    Sodium : {productData.product.nutriscore_data.sodium}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaCookie className="mr-2" />
                    Sucres : {productData.product.nutriscore_data.sugars}g
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
