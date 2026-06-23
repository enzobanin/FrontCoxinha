import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = computed(() => this.cartItems());
  itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantidade, 0)
  );
  total = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.preco * item.quantidade), 0)
  );

  addItem(
    product: { id: number; nome: string; preco: number; image: string },
    quantity: number
  ) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      this.cartItems.set(
        currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + quantity }
            : item
        )
      );
    } else {
      this.cartItems.set([
        ...currentItems,
        {
          id: product.id,
          nome: product.nome,
          preco: product.preco,
          imagem: product.image,
          quantidade: quantity
        }
      ]);
    }
  }

  removeItem(productId: number) {
    this.cartItems.set(
      this.cartItems().filter(item => item.id !== productId)
    );
  }

  updateQuantidade(productId: number, quantidade: number) {
    if (quantidade <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map(item =>
        item.id === productId
          ? { ...item, quantidade }
          : item
      )
    );
  }

  incrementarQuantidade(productId: number) {
    const item = this.cartItems().find(i => i.id === productId);
    if (item) {
      this.updateQuantidade(productId, item.quantidade + 1);
    }
  }

  decrementarQuantidade(productId: number) {
    const item = this.cartItems().find(i => i.id === productId);
    if (item) {
      this.updateQuantidade(productId, item.quantidade - 1);
    }
  }

  clearCart() {
    this.cartItems.set([]);
  }
}