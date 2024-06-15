export interface ProductData {
    product: {
        abbreviated_product_name: string;
        brands: string;
        brands_imported: string;
        nutriscore_data: nutriscore_data;
        status_verbose : string;
        image_url : string;
    };
}

interface nutriscore_data {
    energy: number
    energy_points: number;
    energy_value: number;
    fiber: number;
    fiber_points: number;
    fiber_value: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value: number;
    grade: string;
    is_beverage: number;
    is_cheese: number;
    is_fat: number;
    is_water: number;
    negative_points: number;
    positive_points: number;
    proteins: number;
    proteins_points: number;
    proteins_value: number;
    saturated_fat: number;
    saturated_fat_points: number;
    saturated_fat_value: number;
    score: number;
    sodium: number;
    sodium_points: number;
    sodium_value: number;
    sugars: number;
    sugars_points: number;
    sugars_value: number;
    nutriscore_grade: string;
    nutriscore_score: number;
    nutriscore_score_opposite: number;
}