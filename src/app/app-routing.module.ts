import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProduitComponent } from './components/edit-produit/edit-produit.component';
import { HomeComponent } from './components/home/home.component';
import { NewProduitComponent } from './components/new-produit/new-produit.component';
import { OffresComponent } from './components/offres/offres.component';
import { ProduitsComponent } from './components/produits/produits.component';

const routes: Routes = [
  {path: 'produits', component: ProduitsComponent},
  {path: 'offres', component: OffresComponent},
  {path: 'new-product', component: NewProduitComponent},
  {path: 'home', component: HomeComponent},
  {path: 'produits/edit-product/:id', component: EditProduitComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
