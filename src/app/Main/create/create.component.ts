import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/toast/toast.component';
import { Produto } from '../service/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: []
})
export class CreateComponent implements OnInit {

  produtoForm: FormGroup;

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
    private toast: ToastComponent) {

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

  ngOnInit(): void { }

  submitForm(): void {

    if (this.produtoForm.invalid) {
      this.toast.openSnackBar("Preencha o formulário", undefined, "red-snackbar");
      return;
    }

    let produto: Produto = Object.assign({}, this.produtoForm.value);

    this.router.navigate(['/list']);

    this.toast.openSnackBar("Produto salvo com sucesso");

    // this.productService.post(produto)
    //   .subscribe(
    //     data => {
    //       this.router.navigate(['/list']);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )

  }

}
