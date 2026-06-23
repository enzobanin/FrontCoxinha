import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimentacoes.html',
  styleUrl: './movimentacoes.css'
})
export class Movimentacoes implements OnInit {

  movimentacoes:any[] = [];

  constructor(
    private movimentacaoService: MovimentacaoService,
    private cdr: ChangeDetectorRef
  ){}
  

  ngOnInit(): void {
    console.log("ENTREI NA TELA DE MOVIMENTACOES");
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes(){
  this.movimentacaoService
    .listarMovimentacoes()
    .subscribe({
      next:(res:any)=>{

        console.log("RES COMPLETA", res);
        console.log("OBJECT", res.object);

        this.movimentacoes = [...res.object];
        this.cdr.detectChanges();

        console.log("ARRAY COMPONENTE", this.movimentacoes);

        setTimeout(() => {
          console.log(
            "TAMANHO APOS 1 SEGUNDO:",
            this.movimentacoes.length
          );
        }, 1000);

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
        },
        error:(err)=>{
          alert(err.error.message);
        }
      });
  }
  teste(){
  console.log(this.movimentacoes);
  }
}