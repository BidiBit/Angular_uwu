import { computed, effect, Injectable, signal } from '@angular/core';
import { ItemPedido } from '../../../model/item-pedido';
import { Produto } from '../../../model/produto';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private _listaItens = signal<ItemPedido[]>([]);

  itens = this._listaItens.asReadonly();
  qtdItens = computed(() => this._listaItens().reduce((s,i) => s + i.quantidade,0));
  valorTotal = computed(() => this._listaItens().reduce((s,i) => s + i.quantidade * i.produto.preco,0))

  constructor(){
    try{
      effect(() => {
        localStorage.setItem('lojatp1_carrinho',JSON.stringify(this._listaItens))
      })
    } catch(e){
      // uga
    }
  }

  private _carregarProdutos(): ItemPedido[]{
    try{
      const conteudo = localStorage.getItem('lojatp1_carrinho');
      if(!conteudo)
        return [];
      const lista = JSON.parse(conteudo) as ItemPedido[];
      return lista;

    } catch(e){
      // uga
      return [];
    }
  }

  adicionar(produto: Produto, quantidade: number = 1) {
    if(!produto)
      return;
    const itens = this._listaItens();
    const idx = itens.findIndex(it => it.produto.id === produto.id);
    if(idx > -1) {
      const listaAtualizada = itens.slice();
      listaAtualizada[idx] = {...listaAtualizada[idx], quantidade: listaAtualizada[idx].quantidade + quantidade};
      this._listaItens.set(listaAtualizada);
    }
    else {
      const novoProd : ItemPedido = {quantidade,produto};
      this._listaItens.set([...itens,novoProd]);
    }
  }

  remover(id: number){
    this._listaItens.set(this._listaItens().filter(i => i.produto.id !== id));
  }

  atualizarQtd(id: number, quantidade: number){
    if(quantidade <= 0){
      this.remover(id);
      return;
    }
    const itens = this._listaItens();
    const idx = itens.findIndex(it => it.produto.id === id);
    if(idx > -1){
      const listaAtualizada = itens.slice();
      listaAtualizada[idx] = {...listaAtualizada[idx], quantidade: quantidade};
      this._listaItens.set(listaAtualizada);
    }
  }

  limpar(){
    this._listaItens.set([]);
  }
}
