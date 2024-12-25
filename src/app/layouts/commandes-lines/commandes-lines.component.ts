import { Component, OnInit, signal } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { CurrencyPipe } from '@angular/common'; 
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../auth/models/user'; 
import { IProduct } from '../../models/product.model';
import { ICommande } from '../../models/commande.model';
import { ICommandeLine } from '../../models/commande_line.model';
import { PdfService } from '../../shared/services/pdf.service'; 
import { IStockDispo } from '../../models/stock_dispo.model';
import { CommandeService } from '../commandes/commande.service';
import { CommandeLineService } from './commande-line.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-commandes-lines',
  templateUrl: './commandes-lines.component.html',
  styleUrl: './commandes-lines.component.scss'
})
export class CommandesLinesComponent implements OnInit {
  loadUserData = false;
  isLoadingData = false;
  public routes = routes;

  currentUser!: IUser;
  isLoading = false; // for Submit

  // Qty du panier
  quantity = signal<number>(1); // Initialiser à 1
  qty = signal<number>(1);
 
  totalCart = signal<number>(0);
  totalLength = signal<number>(0);
 

  public search = '';
  dataList: IProduct[] = [];

  commandeId!: number;
  commande!: ICommande;

  commandeLineList: ICommandeLine[] = [];
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private currencyPipe: CurrencyPipe,
    private commandeService: CommandeService,
    private commaneLineService: CommandeLineService,
    private productService: ProductService,
    private pdfService: PdfService, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUserData = true;
    this.isLoadingData = true;
    this.route.params.subscribe(routeParams => {
      this.commandeId = routeParams['id'];
      this.commaneLineService.refreshDataList$.subscribe(() => {
        this.getProduct(this.commandeId);
      });
      this.getProduct(this.commandeId);
    });
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.productService.refreshDataList$.subscribe(() => {
          this.fetchProducts();
        });
        this.fetchProducts();
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  // Format de devise
  formatCurrency(price: number, currency: string): string {
    return this.currencyPipe.transform(price, currency, 'symbol', '1.2-2', 'fr-FR') || '';
  }


  // Get One commande
  getProduct(id: any) {
    this.commandeService.get(Number.parseInt(id)).subscribe(res => {
      this.commande = res.data;
      this.commaneLineService.getAllById(this.commande.ID!).subscribe((line) => {
        this.commandeLineList = line.data;
        this.totalLength.set(this.commandeLineList.length);
      }); 
    });
  }

  // Get all products
  fetchProducts() {
    this.productService.getAllByEntrepriseByPosSearch(this.currentUser.entreprise?.code!, this.currentUser.pos?.ID!, this.search).subscribe((res) => {
      this.dataList = res.data;
      this.isLoadingData = false;
    });
  }

  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts();
  }


  get subtotalTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva === 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }

  get subtotalSansTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva !== 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }

  get tax(): number {
    return this.subtotalTVA * 0.16; // 16% de TVA
  }

  get total(): number {
    return this.subtotalSansTVA + this.subtotalTVA + this.tax;
  }


  onSubmit(product: IProduct) {
    this.isLoading = true;
    const body: ICommandeLine = {
      commande_id: parseInt(this.commande.ID!.toString()),
      product_id: product.ID!,
      quantity: this.qty(),
      code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
    };
    this.commaneLineService.create(body).subscribe((res) => {
      this.toastr.success('Produit ajoutée avec succès!', 'Success!');
      this.qty.set(0);
      this.quantity.set(1);
      this.isLoading = false;
    });
  }


  generatePdf() {
    this.pdfService.generateInvoice(this.commandeLineList);
  }
}

