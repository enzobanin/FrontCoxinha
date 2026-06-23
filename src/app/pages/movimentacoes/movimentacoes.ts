import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { CoxinhaService } from '../../services/coxinha.service';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movimentacoes.html',
  styleUrl: './movimentacoes.css'
})
export class Movimentacoes implements OnInit {

  movimentacoes:any[] = [];
  coxinhas:any[] = [];
  novoSaborSelecionado: { [key:number]: number } = {};
  cliente:any;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private coxinhaService: CoxinhaService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente')!);
    this.carregarMovimentacoes();
    this.carregarCoxinhas();
  }

  carregarCoxinhas(){
    this.coxinhaService.listarCoxinhas().subscribe({
      next: (res:any) => {
        this.coxinhas = res.object;
        this.cdr.detectChanges();
      }
    });
  }

  carregarMovimentacoes(){
    this.movimentacaoService
      .listarPorCliente(this.cliente.id)
      .subscribe({
        next:(res:any)=>{
          this.movimentacoes = [...res.object];
          this.cdr.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }

  estornar(id:number){
    this.movimentacaoService
      .estornar(id)
      .subscribe({
        next:()=>{
          alert("Movimentação estornada");
          this.carregarMovimentacoes();
          this.atualizarClienteLocal();
        },
        error:(err)=>{
          alert(err.error.message);
        }
      });
  }

  trocarSabor(movimentacaoId: number){
    const novaCoxinhaId = this.novoSaborSelecionado[movimentacaoId];
    if(!novaCoxinhaId){
      alert("Selecione um sabor");
      return;
    }
    this.movimentacaoService.trocarSabor(movimentacaoId, novaCoxinhaId).subscribe({
      next: () => {
        alert("Sabor trocado com sucesso!");
        this.carregarMovimentacoes();
        this.atualizarClienteLocal();
      },
      error: (err) => {
        alert(err.error?.message || "Erro ao trocar sabor");
      }
    });
  }

  atualizarClienteLocal(){
    const cliente = JSON.parse(localStorage.getItem('cliente')!);
    this.clienteService.buscarPorId(cliente.id).subscribe({
      next: (res) => {
        localStorage.setItem('cliente', JSON.stringify(res.object));
      }
    });
  }
}