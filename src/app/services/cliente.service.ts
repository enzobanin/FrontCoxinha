import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicResponseDTO } from '../models/basic-response.dto';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3090/api/login/cliente';

  constructor(private http: HttpClient) {}

  fazerLogin(email:string, senha:string){
    return this.http.post<BasicResponseDTO<Cliente>>(
      `${this.apiUrl}/login`,
      { email, senha }
    );
  }

  cadastrar(nome: string, email: string, senha: string){
    return this.http.post<BasicResponseDTO<Cliente>>(
      `${this.apiUrl}`,
      { nome, email, senha }
    );
  }

  atualizarSaldo(id: number, saldo: number){
    return this.http.put<BasicResponseDTO<boolean>>(
      `${this.apiUrl}/saldo?id=${id}`,
      { saldo }
    );
  }

  buscarPorId(id: number){
    return this.http.get<BasicResponseDTO<Cliente>>(
      `${this.apiUrl}/${id}`
    );
  }
}