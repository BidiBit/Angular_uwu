import { Component, inject, input, output, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CurrencyPipe } from '@angular/common';
import { DescontoPipe } from '../../../shared/pipes/desconto-pipe';
import { Truncar } from '../../../shared/pipes/truncar-pipe';
import { CarrinhoService } from '../../carrinho/services/carrinho.service';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';

@Component({
  selector: 'app-card-produto',
  imports: [QuantidadeControle, CurrencyPipe, DescontoPipe, Truncar],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  carrinhoService = inject(CarrinhoService)
  produto = input.required<Produto>();

  quantidade = signal<number>(1);

  add = output<{id: number, qtd: number}>();
  view = output<number>();


  onAdd() {
    this.carrinhoService.adicionar(this.produto(),this.quantidade());
  }

  onView() {
    this.view.emit(this.produto().id);
  }
}
