import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { StatusMesaComponent } from './status-mesa/status-mesa.component';
import {StatusPedidoComponent} from './status-pedido/status-pedido.component';

const routes: Routes = [
  { path: '', redirectTo: '/status-pedido', pathMatch: 'full'},
  { path: 'pedido', component: PedidoComponent },
  { path: 'status-pedido', component: StatusPedidoComponent},
  { path: 'status-mesa', component: StatusMesaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
