import { ProductData } from '../types'
import { FaBolt, FaFire, FaLeaf, FaEgg, FaBacon, FaCubes, FaCookie } from 'react-icons/fa';
import { getNutriScoreColor, getScoreColor } from '../utils/colorUtils';

type Props = {
    item : ProductData;
    onClose: () => void;
}

const ProductModal = ({item, onClose}: Props) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-0">
                <img className="h-48 object-contain md:w-48 mb-4 md:mb-0 md:mr-6" src={item.product.image_url} alt={`product-image-${item.product.abbreviated_product_name || item.product.product_name}`}/>
                <div className="flex flex-col justify-center">
                    <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-left">
                        {item.product.abbreviated_product_name || item.product.product_name}
                    </h2>
                    <p className="mt-2 text-black/45 text-sm text-center md:text-left">{item.product.brands}</p>
                    <p className={`mt-2 text-center md:text-left ${getScoreColor(item.product.nutriscore_data.score)}`}>
                        Score : {item.product.nutriscore_data.score}/100
                    </p>
                    <p className={`mt-2 text-center md:text-left ${getNutriScoreColor(item.product.nutriscore_data.grade)}`}>
                        Nutri-Score : {item.product.nutriscore_data.grade.toUpperCase()}
                    </p>
                </div>
            </div>

            <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-50 dark:via-neutral-400 md:hidden" />

            <div className="text-black text-xl md:text-2xl px-6 md:pl-12">
                <p className="mt-2 flex items-center gap-x-2">
                    <FaBolt className="mr-2" />
                    Énergie : {item.product.nutriscore_data.energy}Kj
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaFire className="mr-2" />
                    Kcal : {(item.product.nutriscore_data.energy / 4.184).toFixed(2)}Kcal
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaLeaf className="mr-2" />
                    Fibres : {item.product.nutriscore_data.fiber}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaEgg className="mr-2" />
                    Protéines : {item.product.nutriscore_data.proteins}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaBacon className="mr-2" />
                    Graisses saturées : {item.product.nutriscore_data.saturated_fat}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaCubes className="mr-2" />
                    Sodium : {item.product.nutriscore_data.sodium}g
                </p>
                <p className="mt-2 flex items-center gap-x-2">
                    <FaCookie className="mr-2" />
                    Sucres : {item.product.nutriscore_data.sugars}g
                </p>
            </div>
        </div>
    </div>
    )
}

export default ProductModal