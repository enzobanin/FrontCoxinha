import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto';
import { Header } from '../../core/header/header';
import { Cart } from '../../cart/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-produtos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos-admin.html',
  styleUrl: './produtos-admin.css',
})
export class ProdutosAdminPage {
  produto: Produto = this.novoProduto();
  produtos: Produto[] = [];

  visualizarProduto(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  adicionarProduto(produto: Produto): Produto {
    this.produtos.push({ ...produto });
    return produto;
  }

  removerProduto(produto: Produto): Produto {
    this.produtos = this.produtos.filter(p => p.id !== produto.id);
    return produto;
  }

  alterarProduto(produtoNovo: Produto): void {
    const idx = this.produtos.findIndex(p => p.id === produtoNovo.id);
    if (idx >= 0) this.produtos[idx] = { ...produtoNovo };
  }

  onSubmit() {
    const existe = this.visualizarProduto(this.produto.id);
    if (existe) {
      this.alterarProduto(this.produto);
    } else {
      this.adicionarProduto(this.produto);
    }
    this.produto = this.novoProduto();
  }

  editar(p: Produto) {
    this.produto = { ...p };
  }

  excluir(p: Produto) {
    this.removerProduto(p);
  }

  private novoProduto(): Produto {
    return {
      id: 0,
      nome: '',
      url: '',
      descricao: '',
      preco: 0,
      categoria: '',
      disponivel: true,
    };
  }
}
