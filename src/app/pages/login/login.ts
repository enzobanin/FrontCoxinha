import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  constructor(
  private clienteService: ClienteService,
  private router: Router
  ){}
  fazerLogin(){
  console.log("CLICOU");

  this.clienteService
    .fazerLogin(this.email, this.senha)
    .subscribe({
      next: (res) => {

        localStorage.setItem(
          'cliente',
          JSON.stringify(res.object)
        );

        this.router.navigate(['/catalogo']);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
