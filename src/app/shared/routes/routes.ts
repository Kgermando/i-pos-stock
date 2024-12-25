export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }
  public static get core(): string {
    return this.baseUrl;
  }


  // Auth
  public static get auth(): string {
    return this.core + '/auth';
  }
  public static get login(): string {
    return this.auth + '/login';
  }

  public static get forgotPassword(): string {
    return this.auth + '/forgot-password';
  }

  public static get register(): string {
    return this.auth + '/register';
  }
  public static get emailVerification(): string {
    return this.auth + '/email-verification';
  }

  public static get lockScreen(): string {
    return this.auth + '/lock-screen';
  }


  // Layouts

  // Dashboard
  public static get dashboard(): string {
    return this.core + '/web/dashboard';
  }
  


  // Users
  public static get user(): string {
    return this.core + '/web/users';
  }
  public static get userList(): string {
    return this.user + '/user-list';
  }

  // Entreprises
  public static get entreprise(): string {
    return this.core + '/web/entreprises';
  }
  public static get entrepriseList(): string {
    return this.entreprise + '/entreprise-list';
  }

  // POS
  public static get pos(): string {
    return this.core + '/web/pos';
  }
  public static get posList(): string {
    return this.pos + '/pos-list';
  }

  // Categories
  public static get category(): string {
    return this.core + '/web/categories';
  }
  public static get categorieList(): string {
    return this.category + '/categorie-list';
  }

  // products
  public static get product(): string {
    return this.core + '/web/products';
  }
  public static get productList(): string {
    return this.product + '/product-list';
  } 

  // commandes
  public static get commande(): string {
    return this.core + '/web/commandes';
  }
  public static get commandeList(): string {
    return this.commande + '/commande-list';
  }

  // clients
  public static get client(): string {
    return this.core + '/web/clients';
  }
  public static get clientList(): string {
    return this.client + '/client-list';
  }

   // fournisseurs
   public static get fournisseur(): string {
    return this.core + '/web/fournisseurs';
  }
  public static get fournisseurList(): string {
    return this.fournisseur + '/fournisseur-list';
  }
 


  // Table
  public static get table(): string {
    return this.core + '/web/tables';
  }
  public static get tableList(): string {
    return this.table + '/table-list';
  }



  // Managers
  public static get managerList(): string {
    return this.core + '/web/managers/manager-list';
  }

  public static get userLogsList(): string {
    return this.core + '/web/users-logs/activity';
  }




}
