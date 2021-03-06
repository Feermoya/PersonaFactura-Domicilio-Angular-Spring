import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends CommonService<Persona> {

  protected miUrl = 'http://localhost:8080/api/cliente/';

}
