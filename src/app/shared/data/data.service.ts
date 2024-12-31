import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }


  public sidebarDataGestion = [
   
    {
      tittle: 'Gestion de commandes',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Ventes',
          icon: 'list-check',
          base: 'commandes',
          route: routes.commandeList,
          hasSubRoute: false,
          showSubRoute: false, 
        }, 
        {
          menuValue: 'Clients',
          icon: 'user-up',
          base: 'clients',
          route: routes.clientList,
          hasSubRoute: false,
          showSubRoute: false,
        },
      ],
    }, 
    {
      tittle: 'Gestion de stocks',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Produits',
          icon: 'brand-airtable',
          base: 'products',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.productList,
        },
        {
          menuValue: 'Fournisseurs',
          icon: 'user-down',
          base: 'fournisseurs',
          route: routes.fournisseurList, 
          hasSubRoute: false,
          showSubRoute: false,
        }, 
      ],
    },
  ];

  public sidebarData = [
    {
      tittle: 'Reporting',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Tableau de board',
          icon: 'layout-2',
          base: 'dashboard',
          route: routes.dashboard,
          hasSubRoute: false,
          showSubRoute: false, 
        }, 
      ],
    }, 
    {
      tittle: 'Gestion de commandes',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Commandes',
          icon: 'list-check',
          base: 'commandes',
          route: routes.commandeList,
          hasSubRoute: false,
          showSubRoute: false, 
        }, 
        {
          menuValue: 'Clients',
          icon: 'user-up',
          base: 'clients',
          route: routes.clientList,
          hasSubRoute: false,
          showSubRoute: false,
        },
      ],
    }, 
    {
      tittle: 'Gestion de stocks',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Produits',
          icon: 'brand-airtable',
          base: 'products',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.productList,
        },
        {
          menuValue: 'Fournisseurs',
          icon: 'user-down',
          base: 'fournisseurs',
          route: routes.fournisseurList, 
          hasSubRoute: false,
          showSubRoute: false,
        }, 
      ],
    },
    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'POS',
          icon: 'home',
          base: 'pos',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.posList,
        },
        {
          menuValue: 'Personnels',
          icon: 'users',
          base: 'users', 
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.userList,
        },
      ],
    },
  ];


  public sidebarDataSupport = [
    {
      tittle: 'Reporting',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Tableau de board',
          icon: 'layout-2',
          base: 'dashboard',
          route: routes.dashboard,
          hasSubRoute: false,
          showSubRoute: false, 
        }, 
      ],
    }, 
    {
      tittle: 'Gestion de commandes',
      showAsTab: true,
      separateRoute: false,
      menu: [ 
        {
          menuValue: 'Ventes',
          icon: 'list-check',
          base: 'commandes',
          route: routes.commandeList,
          hasSubRoute: false,
          showSubRoute: false, 
        },
        // {
        //   menuValue: 'Factures',
        //   icon: 'report-money',
        //   base: 'factures',
        //   route: routes.factureList,
        //   hasSubRoute: false,
        //   showSubRoute: false,
        // },
        {
          menuValue: 'Clients',
          icon: 'user-up',
          base: 'clients',
          route: routes.clientList,
          hasSubRoute: false,
          showSubRoute: false,
        },
      ],
    }, 
    {
      tittle: 'Gestion de stocks',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Produits',
          icon: 'brand-airtable',
          base: 'products',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.productList,
        },
        {
          menuValue: 'Fournisseurs',
          icon: 'user-down',
          base: 'fournisseurs',
          route: routes.fournisseurList, 
          hasSubRoute: false,
          showSubRoute: false,
        },
        // {
        //   menuValue: 'Categories',
        //   icon: 'home',
        //   base: 'categories',
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   route: routes.categorieList,
        // },
      ],
    },
    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'POS',
          icon: 'home',
          base: 'pos',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.posList,
        },
        {
          menuValue: 'Personnels',
          icon: 'users',
          base: 'users', 
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.userList,
        },
        {
          menuValue: 'Entreprises',
          icon: 'building-factory',
          base: 'entreprises',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.entrepriseList,
        },
      ],
    },
  ];


}
