import { FacturaService } from './../../../services/factura.service';
import { Factura } from './../../../models/factura';
import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/models/detalle';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-factura',
  templateUrl: './tabla-factura.component.html',
  styleUrls: ['./tabla-factura.component.css']
})
export class TablaFacturaComponent implements OnInit {
  public facturas: Factura[];

  public facturaDetalle: Detalle[] = [{
    id: 0,
    cantidad: 0,
    precioUnitario: 0,
    nombreArticulo: ""
  }];

  pageActual: number = 1;

  public facturaActual: Factura = {
    id: 0,
    tipoFactura: " ",
    precioTotal: 0,
    fecha: new Date (),
    nroFactura: 0,
    formaPago: " ",

    detalleFactura: [{
      id: 0,
      cantidad: 0,
      precioUnitario: 0,
      nombreArticulo: ""
    }]
  }

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.getAllFacturas();
  }

  getAllFacturas() {
    this.facturaService.getAll().subscribe(res => {
      this.facturas = res;
      console.log(this.facturas);
    });
  }



  delete(factura: Factura) {
    Swal.fire({
      title: 'Estas seguro?',
      text: " No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar factura!'
    }).then((result) => {
      if (result.value) {
        this.facturaService.delete(factura.id).subscribe(
          res => {
            const indexFactura = this.facturas.indexOf(factura);
            this.facturas.splice(indexFactura, 1);
          }
        );
        Swal.fire(
          'Deleted!',
          'La factura fue eliminada con éxito',
          'success'
        )
      }
    })
  }

  onPreUpdate(factura: Factura) {

    this.facturaActual = factura;
  }

  onDetails(factura: Factura) {
    this.facturaDetalle = factura.detalleFactura;
  }

}
