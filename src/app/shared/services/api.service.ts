import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs'; 
import { ApiResponse } from '../model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  private _refreshDataList$ = new Subject<void>();

  private _refreshData$ = new Subject<void>();

  get refreshDataList$() {
    return this._refreshDataList$;
  }

  get refreshData$() {
    return this._refreshData$;
  }

  getPaginatedEntreprise(code_entreprise: number, page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/all/paginate`, { params });
  }

  getPaginatedEntrepriseByPos(code_entreprise: number, pos_id: number, page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/${code_entreprise}/${pos_id}/all/paginate`, { params });
  }
 
  getPaginated(page: number, pageSize: number, search: string): Observable<ApiResponse> {
    let params = new HttpParams()
    .set("page", page.toString())
    .set("page_size", pageSize.toString())
    .set("search", search)
    return this.http.get<ApiResponse>(`${this.endpoint}/all/paginate`, { params });
  }

  getPaginatedById(id: number, page: number, pageSize: number, search: string): Observable<any> {
    let params = new HttpParams()
      .set("page", page.toString())
      .set("page_size", pageSize.toString())
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/all/paginate/${id}`, { params });
  }

  getAllByEntrepriseByPosSearch(code_entreprise: number, pos_id: number, search: string): Observable<any> {
    let params = new HttpParams() 
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/${code_entreprise}/${pos_id}/all/search`, { params });
  }
  
  getAllBySearch(search: string): Observable<any> {
    let params = new HttpParams() 
      .set("search", search)
    return this.http.get<any>(`${this.endpoint}/all/search/${search}`, { params });
  }

  getAllBySearchEntreprisePos(code_entreprise: number, pos_id: number, search: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_id}/all/search/${search}`);
  }

  getTotalQty(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/all/total/${id}`);
  }

  getAllEntreprise(code_entreprise: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/all`);
  }

  getAllEntreprisePos(code_entreprise: number, pos_id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_id}/all`);
  }

  getAllEntrepriseById(code_entreprise: number, pos_id: number, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_id}/all/${id}`);
  }

  getOneEntreprisePos(code_entreprise: number, pos_id: number, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${code_entreprise}/${pos_id}/one/${id}`);
  }


  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endpoint}/all`);
  }
 
  getAll(): Observable<any> {
    return this.http.get(`${this.endpoint}/all`);
  }

  getAllById(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/all/${id}`);
  }


  getAllByIdCount(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/all/count/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.endpoint}/create`, data).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/update/${id}`, data).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/delete/${id}`).pipe(tap(() => {
      this._refreshDataList$.next();
      this._refreshData$.next();
    }));
  }

  // Get file
  getFile(url: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${url}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.endpoint}/uploads`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}