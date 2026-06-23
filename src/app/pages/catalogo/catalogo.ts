import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoxinhaService } from '../../services/coxinha.service';
import { FormsModule } from '@angular/forms';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  coxinhas: any[] = [];
  valoresInseridos: { [key:number]: number } = {};

  constructor(
  private coxinhaService: CoxinhaService,
  private movimentacaoService: MovimentacaoService,
  private router: Router
  ) {}

  ngOnInit(): void {
  this.carregarCoxinhas();
  }
  comprar(coxinhaId:number){

  const cliente = JSON.parse(
    localStorage.getItem('cliente')!
  );

  this.movimentacaoService
    .comprar(
      cliente.id,
      coxinhaId,
      this.valoresInseridos[coxinhaId]
    )
    .subscribe({
      next:(res)=>{
        console.log(res);
        alert("Compra realizada com sucesso!");
      },
      error:(err)=>{
        console.log(err);
        alert("Erro ao comprar");
      }
    });
}

  carregarCoxinhas(): void {
    this.coxinhaService.listarCoxinhas().subscribe({
      next: (res) => {
        console.log(res);
        this.coxinhas = res.object;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
