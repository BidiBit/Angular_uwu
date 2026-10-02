import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Sobre } from './features/sobre/sobre';
import { ProdutoDetalhe } from './features/produtos/produto-detalhe/produto-detalhe';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'produtos', component: ListaProdutos},
    {path: 'produtos/:id', component: ProdutoDetalhe},
    {path: 'sobre', component: Sobre},
    {path: '**', redirectTo: ''},
];
