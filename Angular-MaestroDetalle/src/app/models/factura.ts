import { Detalle } from './detalle';
export class Factura{
  id: number;
  tipoFactura: string;
  precioTotal: number;
  fecha: Date;
  nroFactura: number;
  formaPago: string;
   detalleFactura: Detalle[];
}
