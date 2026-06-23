// src/app/models/produto.ts
export interface Produto {
  id: number;
  nome: string;
  url: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponivel: boolean;
}
