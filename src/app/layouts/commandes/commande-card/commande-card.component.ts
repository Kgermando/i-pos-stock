import { AfterViewInit, Component, OnInit } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { ICommande } from '../../../models/commande.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../auth/models/user';
import { IClient } from '../../../models/client.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator'; 
import { PdfService } from '../../../shared/services/pdf.service';
import { ClientService } from '../../clients/client.service';
import { CommandeService } from '../commande.service';
import { CommandeLineService } from '../../commandes-lines/commande-line.service';

@Component({
  selector: 'app-commande-card',
  templateUrl: './commande-card.component.html',
  styleUrl: './commande-card.component.scss'
})
export class CommandeCardComponent implements OnInit, AfterViewInit {
  loadUserData = false;
  isLoadingData = false;
  public routes = routes;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;

  // Table 
  dataList: ICommande[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number = 0;


  public search = '';

  // Forms  
  idItem!: number;
  dataItem!: ICommande; // Single data

  formGroup!: FormGroup;
  currentUser!: IUser;
  isLoading = false;

  clientList: IClient[] = [];

  commandeLineList: any[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private commandeService: CommandeService,
    private commaneLineService: CommandeLineService,
    private clientService: ClientService,
    private pdfService: PdfService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.commandeService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser);
        });
        this.fetchProducts(this.currentUser);
        
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.loadUserData = true;
    this.isLoadingData = true;
    this.formGroup = this._formBuilder.group({
      ncommande: ['', Validators.required],
      client_id: [''],
    });


  }

  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.fetchProducts(this.currentUser);
  }

  fetchProducts(currentUser: IUser) {
    if (currentUser.role === 'Manager général' ||
      currentUser.role === 'Support') {
      this.commandeService.getPaginatedEntreprise(currentUser.entreprise?.code!, this.pageIndex, this.pageSize, this.search).subscribe((res) => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length; 

        this.clientService.getAllEntreprise(currentUser.entreprise?.code!).subscribe(re => {
          this.clientList = re.data;
        });
        this.isLoadingData = false;
      });
    } else {
      this.commandeService.getPaginatedEntrepriseByPos(currentUser.entreprise?.code!, currentUser.pos?.ID!,
        this.pageIndex, this.pageSize, this.search).subscribe((res) => {
          this.dataList = res.data;
          this.totalItems = res.pagination.total_pages;
          this.length = res.pagination.length; 

          this.clientService.getAllEntreprise(currentUser.entreprise?.code!).subscribe(re => {
            this.clientList = re.data;
          });
          this.isLoadingData = false;
        });
    }
  }


  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts(this.currentUser);
  }

 

  onSubmit() {
    try {
      this.isLoading = true;
      const code = Math.floor(1000000000000 + Math.random() * 9999999999999);
      const body: ICommande = {
        ncommande: code,
        status: 'En cours',
        // client_id: this.formGroup.value.client_id,
        signature: this.currentUser.fullname,
        pos_id: parseInt(this.currentUser.pos!.ID.toString()),
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.commandeService.create(body).subscribe((res) => {
        this.isLoading = false;
        this.toastr.success('Commande crée avec succès!', 'Success!');
        this.router.navigate(['/web/commandes', res.data.ID, 'line']);
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  findValue(value: number) {
    this.idItem = value;
    this.commandeService.get(this.idItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        ncommande: this.dataItem.ncommande,
        status: this.dataItem.status,
        client_id: this.dataItem.client_id,
      });
      this.commaneLineService.getAllById(this.dataItem!.ID!).subscribe((res) => {
        this.commandeLineList = res.data;
      });
    });
  }



  delete(): void {
    this.isLoading = true;
    this.commandeService.delete(this.idItem).subscribe(() => {
      this.formGroup.reset();
      this.toastr.info('Supprimé avec succès!', 'Success!');
      this.isLoading = false;
    });
  }


  generatePdf() {
    this.pdfService.generateInvoice(this.commandeLineList);
  }

}

