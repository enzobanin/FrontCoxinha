import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoxinhaService } from '../../services/coxinha.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  coxinhas: any[] = [];

  constructor(private coxinhaService: CoxinhaService) {}

  ngOnInit(): void {
    this.carregarCoxinhas();
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
