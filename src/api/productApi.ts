import axios from "axios";
import { ProductData } from "../types";

export async function getProductData(code: string): Promise<ProductData> {
    const response = await axios.get<ProductData>(`https://world.openfoodfacts.org/api/v2/product/${code}`);
    return response.data;
}