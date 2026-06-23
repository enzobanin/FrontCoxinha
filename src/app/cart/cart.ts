import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}

  onClose() {
    this.close.emit();
  }

  onBackdropClick() {
    this.onClose();
  }

  onCartClick(event: Event) {
    event.stopPropagation();
  }

  increment(productId: number) {
    this.cartService.incrementarQuantidade(productId);
  }

  decrement(productId: number) {
    this.cartService.decrementarQuantidade(productId);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  checkout() {
    if (this.cartService.itemCount() === 0) return;
    
    alert(`Pedido finalizado!\nTotal: R$ ${this.cartService.total().toFixed(2)}`);
    this.cartService.clearCart();
    this.onClose();
  }
}