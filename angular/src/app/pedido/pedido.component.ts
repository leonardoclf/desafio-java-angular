import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItensService } from '../itens.service';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';
import { SweetAlert } from '../sweet-alert';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  itens: Item[];

  mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  selectedPedidoById: number;
  selectedQuantidade = 1;
  selectPrecoUnit: number;
  selectedMesa: number;
  selectedValor = 0;
  selectedItem: Item;


  constructor(
    private itensService: ItensService,
    private pedidoService: PedidoService
    ) { }

  ngOnInit(): void {
    this.getItens();
  }

  getItens(): void {
    this.itensService.getItens().subscribe(resposta => {
      this.itens = resposta;
    });
  }

  addPedido(): void {

    let selectedItem = this.itens.find(item => item.id === this.selectedPedidoById);
    

    let novoPedido = {
      item: selectedItem.nome,
      quantidade: this.selectedQuantidade,
      valor: this.selectedQuantidade * selectedItem.valor,
      mesa: this.selectedMesa,
      status: 'novo'
    }

    this.pedidoService.addPedido(novoPedido as Pedido).subscribe(resposta =>{
      SweetAlert.exibirSucesso(`Pedido nº ${resposta.id} registrado`)
      this.selectedQuantidade = 1;
      this.selectedValor = 0;
    });
  }

  add():void {
    if(this.selectedPedidoById) {
      this.selectedQuantidade++;
      this.selectedValor += this.selectPrecoUnit;
    }
  }

  remove():void{
    if(this.selectedQuantidade > 1) {
      this.selectedQuantidade--;
      this.selectedValor += this.selectPrecoUnit;
    } 

  }

  getValorUni(item: Item): void {
    this.selectedValor = item.valor;
    this.selectPrecoUnit = item.valor;
  }

  isVazio(): boolean {
    return this.selectedValor === 0;
  }

}
