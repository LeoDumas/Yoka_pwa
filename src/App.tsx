import { useState, useCallback } from "react";
import axios from "axios";
import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';
import { useEffect, useMemo, useRef } from 'react';
import { FaBolt, FaFire, FaLeaf, FaEgg, FaBacon, FaCubes, FaCookie } from 'react-icons/fa';

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

    // Display color on the nutri score so it's more visual
    function getNutriScoreColor(grade: string) {
        switch (grade) {
            case 'a':
                return 'text-green-500';
            case 'b':
                return 'text-green-400';
            case 'c':
                return 'text-yellow-500';
            case 'd':
                return 'text-orange-500';
            case 'e':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    }

    // Display color on score so it's more visual
    function getScoreColor(score: number) {
        if (score >= 75) {
            return 'text-green-500';
        } else if (score >= 50) {
            return 'text-yellow-500';
        } else if (score >= 35) {
            return 'text-orange-500';
        } else {
            return 'text-red-500';
        }
    }

    async function handleSearch(code: string) {
        if (code !== "") {
            setIsLoading(true);
            try {
                const response = await axios.get<ProductData>(`https://world.openfoodfacts.org/api/v2/product/${code}`);
                setProductData(response.data);
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
                <div className="flex rounded-md border border-black overflow-hidden max-w-md mt-2 mx-2">
                    <input type="text"
                        className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                        name="barcodeSearch"
                        id="barcodeSearch"
                        value={barcode}
                        onChange={(e) => setBarCode(e.target.value)}
                    />
                    <button
                        type='button'
                        className="flex items-center justify-center bg-black px-5"
                        onClick={() => handleSearch(barcode)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                            <path
                                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                            </path>
                        </svg>
                    </button>
                </div>
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
                    {/* Loading animation to make sure that the user understand that the result is loading and there is no problem */}
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        <>
                            {/* Display product info or error */}
                            {productData && (
                                <div className="container mx-auto px-4">
                                    <div className="md:flex flex-col md:flex-row">
                                        <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-0">
                                            <img className="h-48 object-contain md:w-48 mb-4 md:mb-0 md:mr-6" src={productData.product.image_url} alt={`product-image-${productData.product.abbreviated_product_name}`} />
                                            <div className="flex flex-col justify-center">
                                                <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center md:text-left">{productData.product.abbreviated_product_name}</h2>
                                                <p className="mt-2 text-black/45 text-sm text-center md:text-left">{productData.product.brands}</p>
                                                <p className={`mt-2 text-center md:text-left ${getScoreColor(productData.product.nutriscore_data.score)}`}>
                                                    Score : {productData.product.nutriscore_data.score}/100
                                                </p>
                                                <p className={`mt-2 text-center md:text-left ${getNutriScoreColor(productData.product.nutriscore_data.grade)}`}>
                                                    Nutri-Score : {productData.product.nutriscore_data.grade.toUpperCase()}
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
                                                Fibres : {productData.product.nutriscore_data.fiber}
                                            </p>
                                            <p className="mt-2 flex items-center gap-x-2">
                                                <FaEgg className="mr-2" />
                                                Protéines : {productData.product.nutriscore_data.proteins}
                                            </p>
                                            <p className="mt-2 flex items-center gap-x-2">
                                                <FaBacon className="mr-2" />
                                                Graisses saturées : {productData.product.nutriscore_data.saturated_fat}
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
                                </div>
                            )}
                            {error && <p>{error}</p>}
                        </>
                    )}
                </article>
            </div>
        </main>
    );
}

export default App;