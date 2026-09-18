import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/logger/logger.service';
import { Produto, ProdutoMapper } from '../../../model/produto';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';
  

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
      promo: false,
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
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(prod => ProdutoMapper.fromJson(prod))),
      catchError(erro => {
        this.logger.error("PRODUTO SERVICE - retornando lista de produto"); 
        return of([]);
      })
    )

  }

  getById(id:number): Observable<Produto | undefined>{
    return of(this.listaMock.find(p=> p.id == id)).pipe(delay(500));
  }
}
