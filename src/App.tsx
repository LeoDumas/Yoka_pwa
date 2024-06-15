import { useState, useCallback } from "react";
import axios from "axios";
import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';
import { useEffect, useMemo, useRef } from 'react';

import NavBar from "./components/NavBar";
import { ProductData } from "./types";

interface ZxingOptions {
  hints?: Map<DecodeHintType, unknown>;
  constraints?: MediaStreamConstraints;
  timeBetweenDecodingAttempts?: number;
  onResult?: (result: Result) => void;
  onError?: (error: Error) => void;
}

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result);
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader, constraints, onResult, onError]);

  return { ref };
};

function App() {
    const [barcode, setBarCode] = useState<string>("");
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUsingCamera, setIsUsingCamera] = useState<boolean>(false);

    const handleResult = useCallback((result: Result) => {
        setBarCode(result.getText());
        handleSearch(result.getText());
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
            try {
                const response = await axios.get<ProductData>(`https://world.openfoodfacts.org/api/v2/product/${code}`);
                setProductData(response.data);
                setError(null);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
                setProductData(null);
                setError("Une erreur s'est produite lors de la récupération des données.");
            }
        }
    }

    return (
        <main className="relative h-screen w-screen">
            <NavBar />
            {isUsingCamera ? (
                <video ref={ref} />
            ) : (
                <>
                    <input
                        className="border-black/20 border"
                        type="text"
                        name="barcodeSearch"
                        id="barcodeSearch"
                        value={barcode}
                        onChange={(e) => setBarCode(e.target.value)}
                    />
                    <button
                        className="text-white bg-black py-1 px-6 rounded-md"
                        onClick={() => handleSearch(barcode)}
                    >
                        Rechercher
                    </button>
                </>
            )}
            <button
                className="text-white bg-black py-1 px-6 rounded-md"
                onClick={() => setIsUsingCamera(!isUsingCamera)}
            >
                {isUsingCamera ? "Utiliser le champ de saisie" : "Utiliser la caméra"}
            </button>
            <p>Code-barres : {barcode}</p>

            <section>
                {productData && (
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-48 w-full object-contain md:w-48" src={productData.product.image_url} alt={`product-image-${productData.product.abbreviated_product_name}`} />
                            </div>
                            <div className="p-8">
                                <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{productData.product.abbreviated_product_name}</h2>
                                <p className="mt-2 text-gray-500">Marque : {productData.product.brands}</p>
                                <p className="mt-2 text-gray-500">Nutri-Score : {productData.product.nutriscore_data.grade}</p>
                                <p className="mt-2 text-gray-500">Énergie : {productData.product.nutriscore_data.energy}Kj</p>
                                <p className="mt-2 text-gray-500">Kcal : {(productData.product.nutriscore_data.energy / 4.184).toFixed(2)}Kcal</p>
                                <p className="mt-2 text-gray-500">Fibres : {productData.product.nutriscore_data.fiber}</p>
                                <p className="mt-2 text-gray-500">Protéines : {productData.product.nutriscore_data.proteins}</p>
                                <p className="mt-2 text-gray-500">Graisses saturées : {productData.product.nutriscore_data.saturated_fat}</p>
                                <p className="mt-2 text-gray-500">Score : {productData.product.nutriscore_data.score}/100</p>
                                <p className="mt-2 text-gray-500">Sodium : {productData.product.nutriscore_data.sodium}g</p>
                                <p className="mt-2 text-gray-500">Sucres : {productData.product.nutriscore_data.sugars}g</p>
                            </div>
                        </div>
                    </div>
                )}
                {error && <p>{error}</p>}
            </section>
        </main>
    );
}

export default App;
