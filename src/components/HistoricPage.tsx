import React, { useEffect, useState } from 'react';
import { ProductData } from '../types';
import NavBar from './NavBar';
import { getNutriScoreColor } from '../utils/colorUtils';

const HistoricPage: React.FC = () => {
    const [items, setItems] = useState<ProductData[]>([]); // Utilisation de l'interface ProductData pour typer le state

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
        setItems(JSON.parse(storedItems));
        console.log(items)
        }
    }, []);

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
                                Nutri-Score : {item.product.nutriscore_data.grade.toUpperCase()}
                            </p>
                            <button className=' absolute bottom-0 bg-black text-white py-1 px-3 rounded-md'>
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


{/* <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-0">
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
        Nutri-Score : {productData.product.nutriscore_data.grade.toUpperCase()}
    </p>
</div>
</div> */}