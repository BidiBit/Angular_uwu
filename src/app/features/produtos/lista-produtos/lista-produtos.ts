import { Component, computed, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from "../card-produto/card-produto";

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
   
  apenasPromo = signal(false);

  produtosExibidos = computed(() =>
    this.apenasPromo() ? this.produtos.filter(p => p.promo): this.produtos
  );

  alterarPromo(){
    this.apenasPromo.update(v => !v);
  }

    produtos = <Produto[]>[
      {
      id: 1,
      nome: 'Ozempic',
      preco: 1500.00,
      descricao: 'Fica magrin fi.',
      imageUrl: 'images/Ozempic.png',
      promo: false,
      estado: 'usado'
    },
    {
      id: 2,
      nome: 'Mounjaro',
      preco: 1900.00,
      descricao: 'Fica mais magrin fi.',
      imageUrl: 'images/Mounjaro.jpg',
      promo: false,
      estado: 'novo'
    },
    {
      id: 3,
      nome: 'Ronaldinho',
      preco: 2026.00,
      descricao: 'Hoje chefe?',
      imageUrl: 'images/Ronaldinho.jpg',
      promo: true,
      estado: 'esgotado'
    },
    {
      id: 4,
      nome: 'Pastor Nargas',
      preco: 0.01,
      descricao: 'Pastor pode matar Pitbull?',
      imageUrl: 'images/Nargas.jpg',
      promo: true,
      estado: 'novo'
    }
  ];

  onViewProduct(id: number) {
    alert('Visualizando produto id'+id);
  }

  onAddProduct(produto: {id: number, qtd: number}){
    alert('Adicionando produto '+produto.id+' | quantidade: '+produto.qtd);
  }
}
