import { HomeComponent } from './components/home/home.component';
import { TablaFacturaComponent } from './components/Factura-Detalle/tabla-factura/tabla-factura.component';
import { TablaComponent } from './components/Persona-Domicilio/tabla/tabla.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: TablaComponent },
  { path: 'factura', component: TablaFacturaComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
