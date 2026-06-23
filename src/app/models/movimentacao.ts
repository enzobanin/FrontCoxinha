export interface Movimentacao{
    id:number;
    clienteId:number;
    coxinhaId:number;
    dataHora:string;
    valorPago:number;
    troco:number;
    tipoSabor:string;
    status:string;
}