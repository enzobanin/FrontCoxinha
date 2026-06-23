import { Component } from '@angular/core';
import { Cart } from '../../cart/cart';
import { CartService } from '../../services/cart.service';
import { Router } from "@angular/router";
import { Header } from '../../core/header/header';

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  isPromo?: boolean;
}

export interface MenuItem {
  titulo: string;
  imagem: string;
  isNew?: boolean;
  produtos: Product[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Cart, Header],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
  categoriaSelecionada: MenuItem | null = null;
  isCartOpen = false;
  filtroAtual: 'todos' | 'promo' = 'todos';
  produtosFiltrados: Product[] = [];
  mostrarMensagemSemPromo = false;

  qtdLocal: { [productId: number]: number } = {};

  constructor(
    public cartService: CartService,
    private router: Router
  ) {
    // fecha os produtos quando trocar de rota
    this.router.events.subscribe(() => this.fecharProdutos());
  }

  menuItems: MenuItem[] = [
    {
      titulo: 'Novidades',
      imagem: 'images/products/new.png',
      isNew: true,
      produtos: [
        {
          id: 1,
          nome: 'Burgão Supreme',
          descricao: 'Hambúrguer artesanal 200g, queijo cheddar, bacon crocante, alface, tomate e molho especial da casa',
          preco: 32.9,
          precoAntigo: 39.9,
          imagem: 'images/products/burgao-supreme.png',
          isPromo: true
        },
        {
          id: 2,
          nome: 'Chicken Crispy',
          descricao: 'Frango empanado crocante, maionese de alho, alface americana e picles',
          preco: 28.9,
          imagem: 'images/products/chicken-crispy.png'
        }
      ]
    },

    {
      titulo: 'Burgers',
      imagem: 'images/products/burger.png',
      produtos: [
        {
          id: 3,
          nome: 'Classic Burger',
          descricao: 'Hambúrguer 180g, queijo, alface, tomate, cebola e molho burgão',
          preco: 25.9,
          precoAntigo: 35.5,
          imagem: 'images/products/classic-burger.png',
          isPromo: true
        },
        {
          id: 4,
          nome: 'Bacon Burger',
          descricao: 'Hambúrguer 180g, bacon, queijo cheddar, cebola caramelizada e barbecue',
          preco: 29.9,
          imagem: 'images/products/bacon-burger.png'
        },
        {
          id: 5,
          nome: 'Double Smash',
          descricao: 'Dois hambúrgueres smash 100g cada, queijo americano, picles e molho especial',
          preco: 34.9,
          imagem: 'images/products/double-smash.png'
        }
      ]
    },

    {
      titulo: 'Acompanhamentos',
      imagem: 'images/products/acompanhamento.png',
      produtos: [
        {
          id: 6,
          nome: 'Onion Rings',
          descricao: 'Anéis de cebola empanados e crocantes com molho barbecue',
          preco: 15.9,
          precoAntigo: 20.90,
          imagem: 'images/products/onion-rings.png',
          isPromo: true
        },
        {
          id: 7,
          nome: 'Nuggets',
          descricao: '10 unidades de nuggets de frango com molho à escolha',
          preco: 18.9,
          imagem: 'images/products/nuggets.png'
        },
        {
          id: 8,
          nome: 'Batata Frita',
          descricao: 'Porção de batata frita crocante e sequinha',
          preco: 12.9,
          imagem: 'images/products/fritas.png'
        }
      ]
    },

    {
      titulo: 'Bebidas',
      imagem: 'images/products/bebidas.png',
      produtos: [
        {
          id: 9,
          nome: 'Refrigerante 350ml',
          descricao: 'Coca-Cola, Guaraná ou Fanta',
          preco: 6.9,
          precoAntigo: 10.9,
          imagem: 'images/products/refrigerante.png',
          isPromo: true
        },
        {
          id: 10,
          nome: 'Suco Natural 500ml',
          descricao: 'Laranja, limão ou morango',
          preco: 9.9,
          imagem: 'images/products/suco-natural.png'
        },
        {
          id: 11,
          nome: 'Milkshake',
          descricao: 'Chocolate, morango ou baunilha',
          preco: 16.9,
          imagem: 'images/products/milkshake.png'
        }
      ]
    },

    {
      titulo: 'Combo em promoção',
      imagem: 'images/products/combo.png',
      produtos: [
        {
          id: 12,
          nome: 'Combo Burgão',
          descricao: 'Burgão Supreme + Fritas Média + Refrigerante 350ml',
          preco: 45.9,
          imagem: 'images/products/combo-burgao.png'
        },
        {
          id: 13,
          nome: 'Combo Família',
          descricao: '3 Burgers + 3 Fritas + 3 Bebidas + Onion Rings',
          preco: 99.9,
          imagem: 'images/products/combo-familia.png'
        }
      ]
    }
  ];

  onMenuItemClick(item: MenuItem) {
    this.categoriaSelecionada = item;
    this.filtroAtual = 'todos';
    this.produtosFiltrados = item.produtos;
    this.mostrarMensagemSemPromo = false;
  }

  fecharProdutos() {
    this.categoriaSelecionada = null;
  }

  setFiltro(filter: 'todos' | 'promo') {
    this.filtroAtual = filter;

    if (!this.categoriaSelecionada) return;

    if (filter === 'todos') {
      this.produtosFiltrados = this.categoriaSelecionada.produtos;
      this.mostrarMensagemSemPromo = false;
      return;
    }

    const promo = this.categoriaSelecionada.produtos.filter(p => p.isPromo);
    this.produtosFiltrados = promo;
    this.mostrarMensagemSemPromo = promo.length === 0;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  fecharCarrinho() {
    this.isCartOpen = false;
  }

  adicionarAoCarrinho(product: Product) {
    const quantity = this.qtdLocal[product.id] || 0;
    if (quantity === 0) return;

    this.cartService.addItem(
      {
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        image: product.imagem
      },
      quantity
    );

    this.qtdLocal[product.id] = 0;
  }

  getQtdProduto(productId: number): number {
    return this.qtdLocal[productId] || 0;
  }

  incrementarProduto(product: Product) {
    const id = product.id;
    this.qtdLocal[id] = (this.qtdLocal[id] || 0) + 1;
  }

  decrementarProduto(product: Product) {
    const id = product.id;
    if (this.qtdLocal[id] > 0) {
      this.qtdLocal[id]--;
    }
  }
}