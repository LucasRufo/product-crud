import { Component, OnInit } from '@angular/core';
import { Produto } from '../service/product.model';
import { ProductService } from '../service/product.service';

const ELEMENT_DATA: Produto[] = [
  { id: '1', nome: 'Hydrogen', preco: 1.0079, descricao: 'H', quantidade: 9 },
  { id: '2', nome: 'Helium', preco: 4.0026, descricao: 'He', quantidade: 9 },
  { id: '3', nome: 'Lithium', preco: 6.941, descricao: 'Li', quantidade: 9 },
];

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  public productList: Produto[];

  constructor(private productService: ProductService) {
    this.productList = [];
  }

  ngOnInit(): void {
    // this.productService.get()
    //   .subscribe(
    //     data => {
    //       this.productList = data;
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )

    this.productList = ELEMENT_DATA;
  }

  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'descricao', 'actions'];
}
