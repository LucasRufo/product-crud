import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from 'src/app/toast/toast.component';
import { Produto } from '../service/product.model';
import { ProductService } from '../service/product.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {

  produtoForm: FormGroup;

  produto: Produto;

  loading: boolean;

  idProduto: string;

  get id() {
    return this.produtoForm.get("id");
  }

  get nome() {
    return this.produtoForm.get("nome");
  }

  get preco() {
    return this.produtoForm.get("preco");
  }

  get quantidade() {
    return this.produtoForm.get("quantidade");
  }

  get descricao() {
    return this.produtoForm.get("descricao");
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toast: ToastComponent,
    private activatedRoute: ActivatedRoute
  ) {

    this.idProduto = '';
    this.produto = { id: '', nome: '', preco: 0, quantidade: 0, descricao: '' };
    this.loading = false;

    this.produtoForm = this.fb.group({
      id: '',
      nome: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      preco: ['', [
        Validators.required
      ]],
      quantidade: ['', [
        Validators.required
      ]],
      descricao: ['', [
        Validators.required,
        Validators.maxLength(300)
      ]]
    });
  }

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.params.subscribe(result => {
      if (!_.isEmpty(result)) {
        this.getProdutoById(result['id']);
      } else {
        this.loading = false;
      }
    });
  }

  submitForm(): void {
    if (this.produtoForm.invalid) {
      this.toast.openSnackBar("Preencha o formulário corretamente", undefined, "red-snackbar");
      return;
    }

    let produto: Produto = Object.assign({}, this.produtoForm.value);

    if (_.isEmpty(this.id?.value)) {
      this.createProduct(produto);
    } else {
      this.updateProduct(produto);
    }
  }

  createProduct(produto: Produto) {
    this.loading = true;

    this.productService.post(produto)
      .subscribe(
        data => {
          this.loading = false;

          this.router.navigate(['/list']);

          this.toast.openSnackBar("Produto salvo com sucesso");
        },
        error => {
          this.toast.openSnackBar("Erro no envio", undefined, "red-snackbar");

          console.log(error);
        }
      )
  }

  updateProduct(produto: Produto) {
    this.loading = true;

    this.productService.put(produto)
      .subscribe(
        data => {
          this.loading = false;

          this.router.navigate(['/list']);

          this.toast.openSnackBar("Produto editado com sucesso");
        },
        error => {
          this.toast.openSnackBar("Erro no envio", undefined, "red-snackbar");

          console.log(error);
        }
      )
  }

  getProdutoById(id: string) {

    this.productService.getById(id)
      .subscribe(
        data => {
          this.loading = false;

          if (!_.isEmpty(data)) {
            this.produto = data;
            this.fillForm();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  fillForm() {
    this.produtoForm.patchValue(this.produto);
  }

}
