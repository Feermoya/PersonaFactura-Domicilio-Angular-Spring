import { TablaFacturaComponent } from './../tabla-factura/tabla-factura.component';
import { FacturaService } from './../../../services/factura.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Factura } from './../../../models/factura';
import { Component, OnInit, Input, ViewChild, ElementRef, Host, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent implements OnInit {


  public formFactura: FormGroup;
  public facturaOriginal: Factura;
  public edit = false;
  public isError = false;
  public nroFactura: number = 0;
  public total: number = 0;


  @Input() set facturaEditar(valor) {
    this.onBuild();
    if (valor) {

      this.facturaOriginal = valor;
      // this.formFactura.setValue({
      //   id: valor.id,
      //   tipoFactura: valor.tipoFactura,
      //   precioTotal: valor.precioTotal,
      //   fecha: valor.fecha,
      //   nroFactura: valor.nroFactura,
      //   formaPago: valor.formaPago,
      //   detalleFactura: this.formBuilder.array(
      //     [this.agregarDetalleFacturaSeteados(valor.detalleFactura.length-1)])

      //     .setValue([
      //       this.setearValores(valor.detalleFactura.length, valor.detalleFactura)
      //     ])

      // });



      this.edit = valor.id !== 0 ? true : false;
    }
  }

  /* Elemento que permite cerrar el modal de forma nativa */
  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  constructor(private facturaService: FacturaService,
    @Host() private tabla: TablaFacturaComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
   this.onBuild();
  }


  /* Método que construye nuestro formulario */
  onBuild() {
    this.formFactura = this.formBuilder.group({
      id: new FormControl(0),
      tipoFactura: new FormControl('', Validators.required),
      precioTotal: this.total,
      fecha: new FormControl(new Date(), Validators.required),
      nroFactura: this.nroFactura,
      formaPago: new FormControl('', Validators.required),

      detalleFactura: this.formBuilder.array([])
    });
  }


  setearPrecio() {
    const control = <FormArray>this.formFactura.controls['detalleFactura'];
    this.total = 0;

    control.controls.forEach(data => {
      let totalxArticulo = data.get('cantidad').value * data.get('precioUnitario').value;

      this.total += totalxArticulo;
    });
    return this.total;
  }

  get detalleFactura() {
    return this.formFactura.get('detalleFactura') as FormArray;
  }

  agregarDetalleFactura() {
    const detalleFormGroup = this.formBuilder.group({
      cantidad: 0,
      precioUnitario: 0,
      nombreArticulo: ''
    });

    this.detalleFactura.push(detalleFormGroup);
  }

  // agregarDetalleFacturaSeteados(indice: number) {
  //   for (let i = 0; i <= indice; i++) {
  //     const detalleFormGroup = this.formBuilder.group({
  //       cantidad: 0,
  //       precioUnitario: 0,
  //       nombreArticulo: ''
  //     });

  //     this.detalleFactura.push(detalleFormGroup);
  //   }
  // }

  // setearValores(indice: number, valores: Detalle) {
  //   for (let i = 0; i <= indice; i++) {
  //     this.detalleFactura.setValue([{
  //       cantidad: valores[indice].cantidad,
  //       precioUnitario: valores[indice].precioUnitario,
  //       nombreArticulo: valores[indice].nombreArticulo
  //     }]);
  //   }

  // }

  numeroDeFactura() {
    // tslint:disable-next-line: radix
    this.nroFactura = Math.random() * 1000000;

    return this.nroFactura;
  }

  removerDetalle(id: number) {
    this.detalleFactura.removeAt(id);

  }

  /* Al darle click a guardar en el formulario */
  onSave(formFactura: FormGroup): void {

    if (formFactura.value.id === 0) {
      //  calcular precio y setearlo
      this.formFactura.get('precioTotal').setValue(this.setearPrecio());
      //  setear numero de factura
      this.formFactura.get('nroFactura').setValue(this.numeroDeFactura());
      // Agregar
      this.add(formFactura.value);

      // eliminar todos los detalles del form
      // this.detalleFactura.controls.splice(0, this.detalleFactura.length);

    } else {
      // Actualizar
      this.update(formFactura.value);
    }
    this.btnClose.nativeElement.click();

  }

  /* Método que suscribe al método post del servicio y realiza la agregación de una persona */
  add(factura: Factura) {
    this.facturaService.post(this.formFactura.value).subscribe(
      res => {
        this.tabla.facturas.push(res);
        Swal.fire(
          'Buen trabajo!',
          'Factura Agregada!',
          'success'
        )
      },
      err => {
        alert('Ocurrió un error al agregar su factura');
        Swal.fire(
          'Buen trabajo!',
          'Factura Agregada!',
          'error'
        )
      }
    );
  }

  /* Método que suscribe al método put del servicio y realiza la actualización de una persona */
  update(factura: Factura) {
    this.facturaService.put(factura.id, factura).subscribe(
      res => {

        alert('Su Factura fue actualizada con éxito');
        this.tabla.facturas.filter(item => {
          if (item.id === factura.id) {
            const idexOfFactura = this.tabla.facturas.indexOf(item);
            this.tabla.facturas.splice(idexOfFactura, 1, res);
          }
        });
      },
      err => {
        alert('Ocurrió un error al actualizar su factura');
      }
    );
  }

  /* Al cerrar ventana modal */
  onClose() {
    this.tabla.facturaActual = {
      id: 0,
      tipoFactura: " ",
      precioTotal: 0,
      fecha: new Date(),
      nroFactura: 0,
      formaPago: " ",
      detalleFactura: [{
        id: 0,
        cantidad: 0,
        precioUnitario: 0,
        nombreArticulo: ""
      }]
    };
    this.isError = false;
    this.edit = false;
  }

  /* Al cerrar alerta del formulario */
  onCloseAlert() {
    this.isError = false;
  }
}
