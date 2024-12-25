import { ICommandeLine } from "./commande_line.model";
import { IClient } from "./client.model";

export interface ICommande {
	ID?: number;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	ncommande?: number;
	status: string;
	client_id?: number;
	Client?: IClient;
	signature: string;
	pos_id?: number;
	code_entreprise?: number;
	commandeLines?: ICommandeLine[];
}
