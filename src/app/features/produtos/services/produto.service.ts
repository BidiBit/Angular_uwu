import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/logger/logger.service';
import { ProductMapper, Produto, ProdutoAPI } from '../../../model/produto';
import { catchError, delay, map, Observable, of, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';



  listar(): Observable<Produto[]>{
    this.logger.info("PRODUTO SERVICE listar() - consumindo api externa");
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(prod=> ProductMapper.fromJson(prod))),
      catchError(erro => {
        this.logger.error("[PRODUTO SERVICE] - ERRO ao lista de produtos");
        
      return of ([]);
    })
    )
  }


  getById(id: number): Observable<Produto | undefined>{
    if (!Number.isInteger(id) || id <=0) {
      return of(undefined);
    }
    return this.http.get<ProdutoAPI>(`${this.apiUrl}/${id}`).pipe(map(produto => ProductMapper.fromJson(produto)),
      catchError(erro => {
        this.logger.error(`[Produto Service] - Erro ao buscar produto ${id}`);
        return of(undefined);
      }));
       
  }


}