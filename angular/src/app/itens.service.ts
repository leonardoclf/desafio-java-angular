import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private itensUrl = 'http://localhost:8080/api/itens';

  


  constructor(private http: HttpClient) { }

  getItens() {
    return this.http.get<Item[]>(this.itensUrl);
  }
  
}
