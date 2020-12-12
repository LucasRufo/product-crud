import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: "1", nome: 'Controle', preco: 500.00, quantidade: 50, descricao: '' },
  { id: "2", nome: 'Xbox', preco: 2800.00, quantidade: 30, descricao: '' },
  { id: "3", nome: 'Ps4', preco: 5000.00, quantidade: 30, descricao: '' },
];

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styles: [
  ]
})
export class ListComponent {

  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'descricao'];
  dataSource = ELEMENT_DATA;

}
