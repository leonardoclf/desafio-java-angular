import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css']
})

export class StatusPedidoComponent implements OnInit {

  pedidos: Pedido[];
  
  dataSource = new MatTableDataSource<Pedido>();
  
  column: string[] = [
    'id', 
    'item', 
    'quantidade', 
    'valor', 
    'mesa', 
    'status'
  ];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(): void {
    this.pedidoService.getPedidos().subscribe(resposta => {
      this.pedidos = resposta;
      this.dataSource.data = this.pedidos;
    });
  }

}