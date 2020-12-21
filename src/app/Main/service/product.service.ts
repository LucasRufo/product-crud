import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Produto } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  protected baseUri: string = "https://4121cf5c7d0a.ngrok.io/";

  get(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUri + "produtos");
  }

  post(produto: Produto): Observable<Produto[]> {
    return this.http.post<any>(this.baseUri + "produtos", { produto: produto });
  }

}
