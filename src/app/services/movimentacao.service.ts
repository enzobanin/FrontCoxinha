import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private apiUrl = 'http://localhost:3090/api/movimentacoes';

  constructor(private http: HttpClient) {}

  comprar(clienteId:number, coxinhaId:number, valorInserido:number){
    return this.http.post(this.apiUrl,{
      clienteId,
      coxinhaId,
      valorInserido
    });
  }

  listarMovimentacoes(){
    return this.http.get(this.apiUrl);
  }

  estornar(id:number){
    return this.http.post(
      `${this.apiUrl}/estornar`,
      { id }
    );
  }
}