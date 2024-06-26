import { useEffect, useMemo, useRef } from 'react';
import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';

// Zxing is used to read the barcode
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
            // Use the back camera
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

export default useZxing;
