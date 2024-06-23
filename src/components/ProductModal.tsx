import { ProductData } from '../types';
import ProductDetails from './ProductDetails';

type Props = {
    productData: ProductData;
    onClose: () => void;
}

const ProductModal = ({productData, onClose}: Props) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <ProductDetails productData={productData} />
            </div>
        </div>
    )
}

export default ProductModal;
