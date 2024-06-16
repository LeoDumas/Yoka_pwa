// App.tsx

import { useState, useCallback } from "react";
import { Result } from '@zxing/library';

import NavBar from "./components/NavBar";
import { ProductData } from "./types";
import useZxing from "./hooks/useZxing";
import { getProductData } from "./api/productApi";
import ProductInfo from "./components/ProductInfo";
import SearchBar from "./components/SearchBar";

function App() {
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
            try {
                const data = await getProductData(code);
                setProductData(data);
                setError(null);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
                setProductData(null);
                setError("Une erreur s'est produite lors de la récupération des données.");
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

export default App;
