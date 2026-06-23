import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { CartService } from '../../services/cart.service';
import { UserMenuComponent } from '../../user-menu/user-menu'; 

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, RouterLinkActive, CommonModule, UserMenuComponent], 
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() cartToggle = new EventEmitter<void>();

  isMenuAberto = signal(false); 
  estaLogado = signal(true); 

  private router = inject(Router);

  constructor(public cartService: CartService) {}

  onCartClick() {
    this.cartToggle.emit();
  }
  
  toggleMenu() {
    this.isMenuAberto.update(v => !v);
  }

  handleLogout() {
      this.estaLogado.set(false); 
      this.isMenuAberto.set(false); 
      this.router.navigate(['/']); 
      console.log("Logout realizado!");
  }
}