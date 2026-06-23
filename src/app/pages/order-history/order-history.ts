import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTAÇÃO OBRIGATÓRIA

// Interface simples para os dados de mockup
interface PedidoMock {
  id: number;
  valorTotal: number;
  dataPedidoString: string; 
  status: string;
  itens?: { quantidade: number; nomeProduto: string; personalizacoes?: string[] }[];
}

@Component({
  selector: 'app-order-history',
  // 1. CHAVE DA CORREÇÃO: Define como Standalone, se não tem AppModule
  standalone: true, 
  // 2. CHAVE DA CORREÇÃO: ADICIONA O CommonModule para liberar *ngIf, *ngFor, ngClass
  imports: [CommonModule], 
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory { 
  
  orders: PedidoMock[] = [
    {
      id: 1005,
      valorTotal: 59.90,
      dataPedidoString: '02 Março 2025', 
      status: 'Entregue',
      itens: [{ quantidade: 1, nomeProduto: 'Lanche Supremo de Cheddar' }]
    },
    {
      id: 1006,
      valorTotal: 34.50,
      dataPedidoString: '25 Fevereiro 2025',
      status: 'Em Preparo',
      itens: [{ quantidade: 1, nomeProduto: 'Combo Batata e Refri' }]
    }
  ];

  isLoading: boolean = false; 
  errorMessage: string | null = null;
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Entregue': return 'status-success';
      case 'Em Preparo': return 'status-warning';
      case 'Cancelado': return 'status-danger';
      default: return 'status-info';
    }
  }
}