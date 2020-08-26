import { Detalle } from './../../../models/detalle';
import { Component, OnInit, Input, Host } from '@angular/core';


@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  detalle: Detalle[];
  total: number = 0;

  @Input() set facturaDetalle(valor) {
    if (valor) {
      this.detalle = valor;
      this.detalle.forEach(data => {
        let totalxArticulo = data.cantidad * data.precioUnitario;
        this.total += totalxArticulo;
      });

    }
  }


  constructor() { }

  ngOnInit(): void {

  }


  onClose() {
    this.total = 0;

  }



}
