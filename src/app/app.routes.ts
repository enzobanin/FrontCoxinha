import { Routes } from '@angular/router';
import { Menu } from './menu/menu/menu';
import { Sobre } from './menu/sobre/sobre';
import { Home } from './core/home/home';
import { ProfileComponent } from './menu/profile/profile';
import { ProdutosAdminPage } from './menu/produtos-admin/produtos-admin';
import { Login } from './pages/login/login';
import { Catalogo } from './pages/catalogo/catalogo';
import { Movimentacoes } from './pages/movimentacoes/movimentacoes';



export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login',component: Login},
  {path: 'catalogo',component: Catalogo},
  {path: 'movimentacoes',  component: Movimentacoes},
  {path: 'home', component: Home},
  {path: 'menu', component: Menu},
  {path: 'sobre', component: Sobre},
  {path: 'perfil', component: ProfileComponent},
  { path: 'admin/produtos', component: ProdutosAdminPage },



  {
    path: 'auth',
    loadComponent: () => 
        // 1. O caminho é './pages/auth/auth' (assumindo a estrutura da sua imagem)
        // 2. A classe exportada DEVE ser referenciada como m.AuthComponent (Padrão Angular)
        import('./pages/auth/auth').then(m => m.Auth) 
  },

  {
    path: 'order-history',
    loadComponent: () => 

        import('./pages/order-history/order-history').then(m => m.OrderHistory) 
  }

];
