import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar @if e @else
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css'
})
export class UserMenuComponent {
  @Input() isOpen = false;
  @Input() estaLogado: boolean = false; // Receberá o valor do signal do Header

  // Saída para o Header
  @Output() close = new EventEmitter<void>();
  @Output() logoutAction = new EventEmitter<void>(); // Novo evento para Logout

  private router = inject(Router);

  /**
   * Fecha o menu (usado ao clicar no botão fechar ou no overlay).
   */
  onClose() {
    this.close.emit();
  }

  /**
   * Navega para uma rota e fecha o menu.
   */
  navegar(rota: string) {
    this.router.navigate([rota]);
    this.onClose();
  }
  
  /**
   * Ação de Logout: Apenas emite o evento para o Header lidar com a lógica de sinal/estado.
   * Fecha o menu logo após a ação.
   */
  onLogout() {
      this.logoutAction.emit();
      this.onClose();
  }
    
  /**
   * Usado para parar a propagação de clique no sidebar, 
   * impedindo que o clique dentro do menu feche o overlay (embora o HTML já faça isso).
   */
  onSidebarClick(event: Event) {
    event.stopPropagation();
  }
}