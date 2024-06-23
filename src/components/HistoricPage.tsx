import React, { useEffect, useState } from 'react';
import { ProductData } from '../types';
import NavBar from './NavBar';
import { getNutriScoreColor } from '../utils/colorUtils';
import ProductModal from './ProductModal';

const HistoricPage: React.FC = () => {
    const [items, setItems] = useState<ProductData[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
        setItems(JSON.parse(storedItems));
        console.log(items)
        }
    }, []);

    const handleProductSelect = (product: ProductData) => {
        setSelectedProduct(product);
    };

    if (selectedProduct) {
        return <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />;
    }

    return (
        <main className="relative h-screen w-screen">
            <NavBar></NavBar>
            <h1 className="text-3xl font-bold mb-6 text-center py-2">Historique</h1>
            {items.length === 0 ? (
                <p>Aucun produit enregistré.</p>
            ) : (
                <div className=" flex flex-col gap-y-6 md:flex-row justify-center items-center mb-6 md:mb-0 px-3">
                {items.map((item, index) => (
                    <div key={index} className=' flex gap-x-2'>
                        <img
                            src={item.product.image_url}
                            alt={`img_${item.product.product_name}`}
                            className=' w-1/4 object-contain'
                        />
                        <div className='relative'>
                            <p className=' uppercase tracking-wide text-sm text-indigo-500 font-semibold'>{item.product.product_name}</p>
                            <p className={`mt-2 ${getNutriScoreColor(item.product.nutriscore_data.grade)}`}>
                                Nutri-Score : {item.product?.nutriscore_data?.grade?.toUpperCase()|| 'Non disponible'}
                            </p>
                            <button
                                className=' absolute bottom-0 bg-black text-white py-1 px-3 rounded-md'
                                onClick={() => handleProductSelect(item)}
                            >
                                Consulter
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </main>
    );
};

export default HistoricPage;