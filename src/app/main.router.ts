import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KoloboksComponent } from './pages/koloboks/koloboks.component';
import { ClaimComponent } from './pages/claim/claim.component';
import { BreedingComponent } from './pages/breeding/breeding.component';

export const routes: Routes = [
  { 
  	path: '', 
  	component: HomeComponent, 
  	pathMatch: 'full' 
  },
  {
  	path: 'koloboks',
  	component: KoloboksComponent
  },
  {
    path: 'claim',
    component: ClaimComponent
  },
  {
    path: 'breeding',
    component: BreedingComponent
  },
  { path: '**', redirectTo: '' },
]
export const appRoutingProviders: any[] = [];
export const appRoutes = RouterModule.forRoot(routes);