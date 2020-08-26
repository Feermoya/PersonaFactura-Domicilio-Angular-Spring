import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaComponent } from './components/Persona-Domicilio/tabla/tabla.component';
import { FormComponent } from './components/Persona-Domicilio/form/form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TablaFacturaComponent } from './components/Factura-Detalle/tabla-factura/tabla-factura.component';
import { FormFacturaComponent } from './components/Factura-Detalle/form-factura/form-factura.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { DetalleFacturaComponent } from './components/Factura-Detalle/detalle-factura/detalle-factura.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    FormComponent,
    NavbarComponent,
    TablaFacturaComponent,
    FormFacturaComponent,
    DetalleFacturaComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
