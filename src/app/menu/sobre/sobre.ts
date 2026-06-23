import { Component } from '@angular/core';
import { Header } from '../../core/header/header';
import { Cart } from '../../cart/cart';
import { CartService } from '../../services/cart.service';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [Header, Cart],
  templateUrl: './sobre.html',
  styleUrls: ['./sobre.css']
})
export class Sobre {
  isCartOpen = false;

  constructor(public cartService: CartService) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  teamMembers: TeamMember[] = [
    {
      name: 'Mateus Gois',
      role: 'Fundador & Chef',
      image: 'images/team/mateus.jpg',
      description: 'Apaixonado por gastronomia há 15 anos, criou o Burgão com o sonho de revolucionar o hambúrguer artesanal.'
    },
    {
      name: 'Enzo',
      role: 'Chef Executivo',
      image: 'images/team/enzo.jpg',
      description: 'Especialista em culinária internacional, traz criatividade e técnica para cada receita do cardápio.'
    },
    {
      name: 'João Victor',
      role: 'Gerente Geral',
      image: 'images/team/joao.jpg',
      description: 'Com experiência em gestão de restaurantes, garante que cada cliente tenha uma experiência memorável.'
    },
    {
      name: 'Matheus Nakagaki',
      role: 'Coordenador de Operações',
      image: 'images/team/matheus.jpg',
      description: 'Responsável pela eficiência operacional e qualidade do atendimento em todas as áreas.'
    },
    {
      name: 'Luiz Victor',
      role: 'Supervisor de Qualidade',
      image: 'images/team/luiz.jpg',
      description: 'Garante os mais altos padrões de qualidade em cada hambúrguer servido.'
    }
  ];
}