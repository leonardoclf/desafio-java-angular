import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidosUrl = 'http://localhost:8080/api/pedidos';
  private mesaUrl = 'http://localhost:8080/api/pedidos/mesa';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  
  
  getPedidos() {
    return this.http.get<Pedido[]>(this.pedidosUrl);
  }
  
  
  addPedido(pedido: any) {
    console.log(pedido);
    return this.http.post<Pedido>(this.pedidosUrl, pedido, this.httpOptions);
  }

  getPedidosByMesa(mesa: any) {
    return this.http.get<Pedido[]>(`${this.mesaUrl}/${mesa}`)
  }

  cancelarPedidoById(id: any) {
    return this.http.put<Pedido>(`${this.mesaUrl}/cancelar-pedido/${id}`, id, this.httpOptions);
  }
  
  concluirPedidoById(id: any) {
    return this.http.put<Pedido>(`${this.mesaUrl}/concluir-pedido/${id}`, id, this.httpOptions);
  }

  fecharMesabyId(id: any) {
    return this.http.put<Pedido>(`${this.mesaUrl}/fechar-mesa/${id}`, id, this.httpOptions);
  }

  alterarPedido(id: any, pedido: any) {
    return this.http.put<Pedido>(`${this.mesaUrl}/alterar-pedido/${id}`, pedido);
  }




}
