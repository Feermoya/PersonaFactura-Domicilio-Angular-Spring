import { Domicilio } from './../models/domicilio';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService extends CommonService<Domicilio> {

  protected miUrl = 'http://localhost:8080/api/cliente/';
}


