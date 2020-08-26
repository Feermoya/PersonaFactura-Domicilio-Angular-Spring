import { Domicilio } from './domicilio';
export interface Persona{
  id: number;
  nombre: string;
  apellido: string;
  telefono: number;
  domicilio:Domicilio;
}
