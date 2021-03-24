import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItensService } from '../itens.service';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-status-mesa',
  templateUrl: './status-mesa.component.html',
  styleUrls: ['./status-mesa.component.css'],
})
export class StatusMesaComponent implements OnInit {
  mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedMesaId: number;
  selectedMesa: Pedido[];
  valorTotal = 0;
  itens: Item[];
  edit = false;
  editId: number;

  // Fields de edição
  selectedPedidoById: number;
  selectedQuantidade = 1;

  constructor(
    private pedidoService: PedidoService,
    private itensService: ItensService
  ) {}

  ngOnInit(): void {
    this.getItens();
  }

  selectMesa(mesa): void {
    this.selectedMesaId = mesa;
    this.getMesaSelected(mesa);
  }

  getMesaSelected(mesa): void {
    this.valorTotal = 0;

    this.pedidoService.getPedidosByMesa(mesa).subscribe((resposta) => {
      this.selectedMesa = resposta.filter((i) => {
        if (i.status !== 'finalizado' && i.status !== 'cancelado') return i;
      });
      this.selectedMesa.forEach((mesa) => {
        if (mesa.status === 'concluído' || mesa.status === 'novo') this.valorTotal += mesa.valor;
      });
    });
  }

  escolherOutraMesa(): void {
    this.selectedMesaId = 0;
  }

  cancelarPedido(pedido): void {
    this.pedidoService.cancelarPedidoById(pedido).subscribe((resposta) => {
      this.selectedMesa.map((p) => {
        if (p.id === pedido) {
          p.status = 'cancelado';
        }
      });
      this.valorTotal -= resposta.valor;
    });
  }

  concluirPedido(pedido): void {
    this.pedidoService.concluirPedidoById(pedido).subscribe((resposta) => {
      console.log(resposta);
      this.selectedMesa.map((p) => {
        if (p.id === pedido) 
          p.status = 'concluído';
      });
    });
  }

  fecharMesa(mesaSelecionada): void {
    this.pedidoService.fecharMesabyId(mesaSelecionada).subscribe((resposta) => {
      this.selectedMesa.map((pedido) => {
        if (pedido.status === 'novo' || pedido.status === 'concluído')
          pedido.status = 'finalizado';
      });
    });
  }

  isCancelado(pedido: Pedido): boolean {
    return pedido.status === 'cancelado';
  }

  getItens(): void {
    this.itensService.getItens().subscribe((resposta) => {
      this.itens = resposta;
    });
  }

  alterarPedidoDialog(pedidoId): void {
    this.editId = pedidoId;
  }

  checkEdit(pedidoId): boolean {
    return this.editId === pedidoId;
  }

  alterarPedido(pedidoId): void {
    let itemSelecionado: Item[] = this.itens.filter(
      (item) => item.id === this.selectedPedidoById
    );

    let novoPedido = {
      item: itemSelecionado[0].nome,
      quantidade: this.selectedQuantidade,
      valor: this.selectedQuantidade * itemSelecionado[0].valor,
    };

    this.pedidoService
      .alterarPedido(pedidoId, novoPedido)
      .subscribe((resposta) => {     
        this.selectedMesa.map((p) => {
          if (p.id === pedidoId) {
            p.item = resposta.item;
            p.quantidade = resposta.quantidade;
            p.valor = resposta.valor;
          }
        });
        this.alterarPedidoDialog(-1);
      });
  }

  add(): void {
    this.selectedQuantidade++;
  }

  remove(): void {
    if (this.selectedQuantidade > 1) {
      this.selectedQuantidade--;
    }
  }
}
