import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/logger/logger.service';
import { Produto } from '../../../model/produto';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private logger = inject(LoggerService);

  private readonly listaMock = <Produto[]>[
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
      promo: false,
      estado: 'novo'
    }
];

  listar(): Observable<Produto[]>{
    this.logger.info("PRODUTO SERVICE - retornando lista de produto");
    return of(this.listaMock).pipe(delay(1000))

  }

  getById(id:number): Observable<Produto | undefined>{
    return of(this.listaMock.find(p=> p.id == id)).pipe(delay(500));
  }
}
