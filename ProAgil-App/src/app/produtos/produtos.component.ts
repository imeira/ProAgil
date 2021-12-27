import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProdutoService } from '../_services/produto.service';
import { Produto } from '../_models/Produto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  titulo = 'Produtos';
  produtosFiltrados: Produto[];
  produtos: Produto[];
  produto: Produto;
  modoSalvar = 'post';

  registerForm: FormGroup;
  bodyDeletarProduto = '';

  dataAtual: string;

  _filtroLista = '';

  constructor(
    private produtoService: ProdutoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.produtosFiltrados = this.filtroLista ? this.filtrarProdutos(this.filtroLista) : this.produtos;
  }

  editarProduto(produto: Produto, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.produto = Object.assign({}, produto);
    this.registerForm.patchValue(this.produto);
  }

  novoProduto(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirProduto(produto: Produto, template: any) {
    this.openModal(template);
    this.produto = produto;
    this.bodyDeletarProduto = `Tem certeza que deseja excluir o Produto: ${produto.nome}, Código: ${produto.id}`;
  }

  confirmeDelete(template: any) {
    this.produtoService.deleteProduto(this.produto.id).subscribe(
      () => {
        template.hide();
        this.getProdutos();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getProdutos();
  }

  filtrarProdutos(filtrarPor: string): Produto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      produto => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.max(120000)]],
      price: ['', Validators.required]
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.produto = Object.assign({}, this.registerForm.value);

        this.produtoService.postProduto(this.produto).subscribe(
          (novoProduto: Produto) => {
            template.hide();
            this.getProdutos();
            this.toastr.success('Inserido com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          }
        );
      } else {
        this.produto = Object.assign({ id: this.produto.id }, this.registerForm.value);

        this.produtoService.putProduto(this.produto).subscribe(
          () => {
            template.hide();
            this.getProdutos();
            this.toastr.success('Editado com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Editar: ${error}`);
          }
        );
      }
    }
  }

  getProdutos() {
    this.dataAtual = new Date().getMilliseconds().toString();

    this.produtoService.getAllProduto().subscribe(
      (_produtos: Produto[]) => {
        this.produtos = _produtos;
        this.produtosFiltrados = this.produtos;
        console.log(this.produtos);
      }, error => {
        this.toastr.error(`Erro ao tentar Carregar produtos: ${error}`);
      });
  }

}
