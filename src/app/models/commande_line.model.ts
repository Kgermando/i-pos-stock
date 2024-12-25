import { ICommande } from "./commande.model";
import { IProduct } from "./product.model";

export interface ICommandeLine {
    ID?: number; 
    CreatedAt?: Date;
    UpdatedAt?: Date;
    commande_id: number;
    product_id: number;
    quantity: number; 
    code_entreprise?: number;
    Commande?: ICommande;
    Product?: IProduct; 
}