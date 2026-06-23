import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  nome = '';
  isLoginMode = true;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ){}

  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
    this.email = '';
    this.senha = '';
    this.nome = '';
  }

  fazerLogin(){
    this.clienteService
      .fazerLogin(this.email, this.senha)
      .subscribe({
        next: (res) => {
          localStorage.setItem('cliente', JSON.stringify(res.object));
          this.router.navigate(['/catalogo']);
        },
        error: (err) => {
          alert(err.error?.message || 'Erro ao fazer login');
        }
      });
  }

  cadastrar(){
    this.clienteService
      .cadastrar(this.nome, this.email, this.senha)
      .subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso! Faça login.');
          this.toggleMode();
        },
        error: (err) => {
          alert(err.error?.message || 'Erro ao cadastrar');
        }
      });
  }

  onSubmit(){
    if(this.isLoginMode){
      this.fazerLogin();
    } else {
      this.cadastrar();
    }
  }
}