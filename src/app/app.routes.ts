import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalogo } from './pages/catalogo/catalogo';
import { Movimentacoes } from './pages/movimentacoes/movimentacoes';



export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login',component: Login},
  {path: 'catalogo',component: Catalogo},
  {path: 'movimentacoes',  component: Movimentacoes},



  {
    path: 'auth',
    loadComponent: () => 
        // 1. O caminho é './pages/auth/auth' (assumindo a estrutura da sua imagem)
        // 2. A classe exportada DEVE ser referenciada como m.AuthComponent (Padrão Angular)
        import('./pages/auth/auth').then(m => m.Auth) 
  },


];
