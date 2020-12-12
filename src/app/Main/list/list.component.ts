import { Component, OnInit } from '@angular/core';
import { Product } from '../service/product.model';
import { ProductService } from '../service/product.service';

// const ELEMENT_DATA: Produto[] = [
//   { id: "1", nome: 'Controle', preco: 500.00, quantidade: 50, descricao: '' },
//   { id: "2", nome: 'Xbox', preco: 2800.00, quantidade: 30, descricao: '' },
//   { id: "3", nome: 'Ps4', preco: 5000.00, quantidade: 30, descricao: '' },
// ];

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  public productList: Product[];

  constructor(private productService: ProductService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.productService.get()
      .subscribe(
        data => {
          this.productList = data;
        },
        error => {
          console.log(error);
        }
      )
  }

  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'descricao'];

}
