import { useState, useCallback } from "react";
import { Result } from '@zxing/library';

import NavBar from "../components/NavBar";
import { ProductData } from "../types";
import useZxing from "../hooks/useZxing";
import { getProductData } from "../api/productApi";
import ProductInfo from "../components/ProductInfo";
import SearchBar from "../components/SearchBar";

function ProductPage() {
    const [barcode, setBarCode] = useState<string>("");
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUsingCamera, setIsUsingCamera] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleResult = useCallback((result: Result) => {
        setBarCode(result.getText());
        handleSearch(result.getText());
        setIsUsingCamera(false);
    }, []);

    const handleError = useCallback((error: Error) => {
        console.error("Une erreur s'est produite lors de la lecture du code-barres :", error);
    }, []);

    const { ref } = useZxing({
        onResult: handleResult,
        onError: handleError
    });

    async function handleSearch(code: string) {
        if (code !== "") {
            setIsLoading(true);
            // Check if user connected to internet
            if (!navigator.onLine) {
                // if not connected to the internet, use data from the localStorage
                const itemsFromStorage = localStorage.getItem("items");
                if (itemsFromStorage) {
                    try {
                        const existingItems = JSON.parse(itemsFromStorage);
                        if (Array.isArray(existingItems)) {
                            const existingItem = existingItems.find((item: ProductData) => item.product.code === code);
                            if (existingItem) {
                                setProductData(existingItem);
                                setError(null);
                            } else {
                                setProductData(null);
                                setError("Produit non trouvé dans le cache hors ligne.");
                            }
                        }
                    } catch (error) {
                        console.error("Erreur lors de l'analyse des données du localStorage :", error);
                    }
                } else {
                    setProductData(null);
                    setError("Aucun produit trouvé dans le cache hors ligne.");
                }
            } else {
                // If online, make a API request
                try {
                    const data = await getProductData(code);
                    setProductData(data);
                    // Add product to the localStorage
                    const itemsFromStorage = localStorage.getItem("items");
                    let existingItems = [];
                    if (itemsFromStorage) {
                        existingItems = JSON.parse(itemsFromStorage);
                    }
                    // Check if product already exist in the localStorage
                    const existingItemIndex = existingItems.findIndex((item: ProductData) => item.product.code === code);
                    if (existingItemIndex !== -1) {
                        // if exists, update product's data
                        existingItems[existingItemIndex] = data;
                    } else {
                        // otherwise, add it to the localStorage
                        existingItems.push(data);
                    }
                    localStorage.setItem("items", JSON.stringify(existingItems));
                    setError(null);
                } catch (error) {
                    console.error("Une erreur s'est produite :", error);
                    setProductData(null);
                    setError("Une erreur s'est produite lors de la récupération des données.");
                }
            }
            setIsLoading(false);
        }
    }

    return (
        <main className="relative h-screen w-screen">
            <NavBar />
            {isUsingCamera ? (
                <video ref={ref} />
            ) : (
                <SearchBar barcode={barcode} setBarCode={setBarCode} handleSearch={handleSearch} />
            )}
            <div className="flex justify-center mt-2">
                <button
                    className="text-white bg-black py-1 px-6 rounded-md"
                    onClick={() => setIsUsingCamera(!isUsingCamera)}
                >
                    {isUsingCamera ? "Utiliser le champ de saisie" : "Utiliser la caméra"}
                </button>
            </div>

            <div className="min-h-screen flex mt-12 justify-center">
                <article className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            {productData && <ProductInfo productData={productData} />}
                            {error && <p>{error}</p>}
                        </>
                    )}
                </article>
            </div>
        </main>
    );
}

export default ProductPage;
