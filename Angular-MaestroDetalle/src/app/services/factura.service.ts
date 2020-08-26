import { Factura } from './../models/factura';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends CommonService<Factura> {

  protected miUrl = 'http://localhost:8080/api/factura/';
}
