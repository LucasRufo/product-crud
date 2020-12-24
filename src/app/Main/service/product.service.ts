import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  protected baseUri: string = "https://8ba90897b3eb.ngrok.io/";

  get(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUri + "produtos/");
  }

  getById(id: string): Observable<Produto> {
    return this.http.get<Produto>(this.baseUri + "produtos/" + id);
  }

  post(produto: Produto): Observable<any> {
    return this.http.post<any>(this.baseUri + "produtos/", produto);
  }

  put(produto: Produto): Observable<any> {
    return this.http.put<any>(this.baseUri + "produtos/", produto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUri + "produtos/" + id);
  }

}
