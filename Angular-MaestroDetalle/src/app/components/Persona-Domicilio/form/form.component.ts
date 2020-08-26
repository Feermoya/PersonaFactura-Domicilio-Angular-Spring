import { TablaComponent } from './../../Persona-Domicilio/tabla/tabla.component';


import { Component, OnInit, Host, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public formPersona: FormGroup;
  public personaOriginal: Persona;
  public edit = false;
  public isError = false;

  /*  */
  @Input() set personaEditar(valor) {
    this.onBuild();
    if (valor) {
      this.personaOriginal = valor;
      this.formPersona.setValue({
        id: valor.id,
        nombre: valor.nombre,
        apellido: valor.apellido,
        telefono: valor.telefono,
        domicilio: {
          calle: valor.domicilio.calle,
          numero: valor.domicilio.numero,
          piso: valor.domicilio.piso,
          nroDepartamento: valor.domicilio.nroDepartamento,
          aclaracion: valor.domicilio.aclaracion
        }

      });
      this.edit = valor.id !== 0 ? true : false;
    }
  }

  /* Elemento que permite cerrar el modal de forma nativa */
  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  constructor(private personaService: PersonaService,
    @Host() private tabla: TablaComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.onBuild();
  }

  /* Método que construye nuestro formulario */
  onBuild() {
    this.formPersona = this.formBuilder.group({
      id: new FormControl(0),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl(null, [Validators.required]),
      domicilio: this.formBuilder.group({
        calle: new FormControl('', Validators.required),
        numero: new FormControl(null, [Validators.required]),
        piso: new FormControl(null, [Validators.required]),
        nroDepartamento: new FormControl(null, [Validators.required]),
        aclaracion: new FormControl('', Validators.required),
      })
    });
  }

  /* Al darle click a guardar en el formulario */
  onSave(formPersona: FormGroup): void {

    if (formPersona.value.id === 0) {
      // Agregar
      this.add(formPersona.value);
      Swal.fire(
        'Buen trabajo!',
        'Usuario Agregado!',
        'success'
      )

    } else {
      // Actualizar
      this.update(formPersona.value);
      Swal.fire(
        'Buen trabajo!',
        'Usuario Actualizado!',
        'success'
      )
    }
    this.btnClose.nativeElement.click();
  }


  /* Método que suscribe al método post del servicio y realiza la agregación de una persona */
  add(persona: Persona) {

    console.log(persona)
    console.log(this.formPersona.value)
    this.personaService.post(this.formPersona.value).subscribe(
      res => {
        this.tabla.personas.push(res);
        this.formPersona.reset();
      },
      err => {
        alert('Ocurrió un error al agregar la persona');
        this.formPersona.reset();
      }
    );
  }

  /* Método que suscribe al método put del servicio y realiza la actualización de una persona */
  update(persona: Persona) {
    this.personaService.put(persona.id, persona).subscribe(
      res => {
        // alert('Persona fue actualizada con éxito');
        this.tabla.personas.filter(item => {
          if (item.id === persona.id) {
            const idexOfPersona = this.tabla.personas.indexOf(item);
            this.tabla.personas.splice(idexOfPersona, 1, res);
          }
        });
        this.formPersona.reset();
      },
      err => {
        alert('Ocurrió un error al actualizar persona');
      }
    );
  }

  /* Al cerrar ventana modal */
  onClose() {
    this.tabla.personaActual = {
      id: 0,
      nombre: null,
      apellido: null,
      telefono: null,

      domicilio: {
        id: 0,
        calle: null,
        numero: null,
        piso: null,
        nroDepartamento: null,
        aclaracion: null
      }
    };
    this.isError = false;
    this.edit = false;
    this.formPersona.reset();
  }

  /* Al cerrar alerta del formulario */
  onCloseAlert() {
    this.isError = false;
  }

}
