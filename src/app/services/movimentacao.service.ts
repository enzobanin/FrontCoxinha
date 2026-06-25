import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private apiUrl = 'https://bancacoxinha-api.onrender.com/api/movimentacoes';

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
  listarPorCliente(clienteId: number){
    return this.http.get(`${this.apiUrl}/cliente/${clienteId}`);
  }

  estornar(id:number){
    return this.http.post(
      `${this.apiUrl}/estornar`,
      { id }
    );
  }
  trocarSabor(movimentacaoId: number, novaCoxinhaId: number){
    return this.http.post(
      `${this.apiUrl}/trocar-sabor`,
      { movimentacaoId, novaCoxinhaId }
    );
  }
}