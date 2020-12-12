import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  protected baseUri: string = "https://4121cf5c7d0a.ngrok.io/";

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUri + "produtos");
  }

}
