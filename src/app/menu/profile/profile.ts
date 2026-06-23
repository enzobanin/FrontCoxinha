import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';
import { Cart } from '../../cart/cart';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Cart], 
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
    isCartOpen = false;

  constructor(public cartService: CartService) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  editMode = false;

  user = {
    nome: 'Matheus Gouveia',
    email: 'matheus@burgao.com',
    telefone: '(11) 98765-4321',
    senha: '********', 
    cpf: '12345678900',
    endereco: 'Rua dos Bobos',
    numero: '0',
    complemento: 'Apto 45',
    bairro: 'Bobões',
  };

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.editMode = false;
    console.log('Dados salvos:', this.user);
  }

}