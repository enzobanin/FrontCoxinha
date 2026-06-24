import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalogo } from './pages/catalogo/catalogo';
import { Movimentacoes } from './pages/movimentacoes/movimentacoes';



export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login',component: Login},
  {path: 'catalogo',component: Catalogo},
  {path: 'movimentacoes',  component: Movimentacoes},




];
