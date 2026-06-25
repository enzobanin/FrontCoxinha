import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoxinhaService } from '../../services/coxinha.service';
import { FormsModule } from '@angular/forms';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  coxinhas: any[] = [];
  valoresInseridos: { [key:number]: number } = {};
  cliente:any;
  valorCredito: number = 0;

  constructor(
    private coxinhaService: CoxinhaService,
    private movimentacaoService: MovimentacaoService,
    private clienteService: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCoxinhas();
    this.cliente = JSON.parse(localStorage.getItem('cliente')!);
  }
  getImagem(sabor:string):string{

  switch(sabor){

    case 'Carne':
      return '/images/products/Coxinha-de-Carne-removebg-preview.png';

    case 'Costela':
      return '/images/products/Coxinha-costela--removebg-preview.png';

    case 'Frango':
      return '/images/products/coxinhaFrango-removebg-preview.png';

    case 'FrangoCatupiry':
      return '/images/products/coxinha.png';

    case 'Queijo':
      return '/images/products/coxinha-de-queijo-300x237-removebg-preview.png';

    default:
      return '/images/products/coxinha.png';
  }
}

  atualizarClienteLocal(){
    this.clienteService.buscarPorId(this.cliente.id).subscribe({
      next: (res) => {
        console.log("CLIENTE ATUALIZADO", res.object);
        this.cliente = res.object;
        localStorage.setItem('cliente', JSON.stringify(this.cliente));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  inserirCredito(){
    const novoSaldo = this.cliente.saldo + this.valorCredito;
    this.clienteService.atualizarSaldo(this.cliente.id, novoSaldo).subscribe({
      next: () => {
        this.atualizarClienteLocal();
        this.valorCredito = 0;
        alert('Crédito inserido com sucesso!');
      },
      error: (err) => {
        alert(err.error?.message || 'Erro ao inserir crédito');
      }
    });
  }

  comprar(coxinhaId:number){
    this.movimentacaoService
      .comprar(this.cliente.id, coxinhaId, this.valoresInseridos[coxinhaId])
      .subscribe({
        next:()=>{
          alert("Compra realizada com sucesso!");
          this.atualizarClienteLocal();
        },
        error:(err)=>{
          alert(err.error?.message || "Erro ao comprar");
        }
      });
  }

  carregarCoxinhas(): void {
    this.coxinhaService.listarCoxinhas().subscribe({
      next: (res:any) => {
        this.coxinhas = res.object;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logout(){
    localStorage.removeItem('cliente');
    this.router.navigate(['/login']);
  }
}