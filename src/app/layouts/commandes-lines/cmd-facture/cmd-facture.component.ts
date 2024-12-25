import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IUser } from '../../../auth/models/user';
import { ICommande } from '../../../models/commande.model';
import { CommandeDbService } from '../../commandes/commande-db.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommandeService } from '../../commandes/commande.service';
import { ICommandeLine } from '../../../models/commande_line.model';
import { IStock } from '../../../models/stock.model';
import { IProduct } from '../../../models/product.model';
import { StockService } from '../../stocks/stock.service';
import { parseDate } from 'ngx-bootstrap/chronos';
import { CommandeLineService } from '../commande-line.service';



@Component({
  selector: 'app-cmd-facture',
  templateUrl: './cmd-facture.component.html',
  styleUrl: './cmd-facture.component.scss'
})
export class CmdFactureComponent {
  @Input() currentUser!: IUser;
  @Input() commande_id: number | undefined;
  @Input() commande!: ICommande;
  @Input() commandeLineList: ICommandeLine[] = [];
  isLoading = false;

  constructor(private router: Router,
    private currencyPipe: CurrencyPipe,
    private commandeService: CommandeService,
    private commandeLineService: CommandeLineService,
    private stockService: StockService,
    private toastr: ToastrService
  ) { }


  get subtotalTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva === 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }

  get subtotalSansTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva !== 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }

  get subtotal(): number {
    return this.subtotalSansTVA + this.subtotalTVA;
  }

  get tax(): number {
    return this.subtotalTVA * 0.16; // 16% de TVA
  }

  get total(): number {
    return this.subtotalSansTVA + this.subtotalTVA + this.tax;
  }



  // Format de devise
  formatCurrency(price: number, currency: string): string {
    return this.currencyPipe.transform(price, currency, 'symbol', '1.2-2', 'fr-FR') || '';
  }

  onSubmitFacture(status: string) {
    try {
      this.isLoading = true;
      const body: ICommande = {
        ncommande: this.commande.ncommande,
        status: status,
        // client_id: this.formGroup.value.client_id,
        signature: this.currentUser.fullname,
        pos_id: parseInt(this.currentUser.pos!.ID.toString()),
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.commandeService.update(this.commande_id!, body).subscribe(() => {
        this.toastr.success('Modification enregistrée!', 'Success!');
        this.isLoading = false;
        this.router.navigate(['/web/commandes/commande-list']);
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  restitutionBtn(id: number, product: IProduct, quantity: number) {
    try {
      this.isLoading = true;
      const body: IStock = {
        product_id: parseInt(product.ID!.toString()),
        description: 'Quantité restituée',
        fournisseur_id: 0,
        quantity: quantity,
        prix_achat: 0,
        date_expiration: parseDate(new Date().setFullYear(2030, 1, 1)),
        signature: this.currentUser.fullname,
        pos_id: parseInt(this.currentUser.pos!.ID.toString()),
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.stockService.create(body).subscribe(res => {
        this.commandeLineService.delete(id).subscribe(() => {
          this.isLoading = false;
          this.toastr.success('Quantité restituée dans Stock avec succès!', 'Success!');
        });
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  delete(): void {
    this.isLoading = true;
    this.commandeService.delete(this.commande_id!).subscribe(() => {
      for (let index = 0; index < this.commandeLineList.length; index++) {
        const element = this.commandeLineList[index];
        this.restitutionBtn(element.ID!, element.Product!, element.quantity);
      };
      this.toastr.info('Supprimé avec succès!', 'Success!');
      this.router.navigate(['/web/commandes/commande-list']);
      this.isLoading = false;
    });
  }



} 
