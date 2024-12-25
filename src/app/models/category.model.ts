import { IProduct } from "./product.model";

export interface ICategory {
    ID: number; 
    created_at: Date;
    updated_at: Date;
    name: string;
    signature: string; 
    products: IProduct[]; 
}