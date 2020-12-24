import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Produto } from '../service/product.model';
import { ProductService } from '../service/product.service';
import * as _ from 'underscore';

// const ELEMENT_DATA: Produto[] = [
//   { id: '1', nome: 'Hydrogen', preco: 1.0079, descricao: 'H', quantidade: 9 },
//   { id: '2', nome: 'Helium', preco: 4.0026, descricao: 'He', quantidade: 9 },
//   { id: '3', nome: 'Lithium', preco: 6.941, descricao: 'Li', quantidade: 9 },
// ];

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  public productList: Produto[];

  loading: boolean;

  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'descricao', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.productList = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.getProdutos();

    // this.productList = ELEMENT_DATA;
  }

  private getProdutos() {
    this.loading = true;

    this.productService.get()
      .subscribe(
        data => {
          this.loading = false;

          if (!_.isEmpty(data)) {
            this.productList = data;
          } else {
            this.productList = [];
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  openModal(id: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: { excluir: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.loading = true;

        this.productService.delete(id)
          .subscribe(
            data => {
              this.getProdutos();
            },
            error => {
              console.log(error);

              this.loading = false;
            });
      }
    });
  }

}
