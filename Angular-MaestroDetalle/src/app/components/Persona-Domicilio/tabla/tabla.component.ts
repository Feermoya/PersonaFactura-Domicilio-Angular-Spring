import { PersonaService } from './../../../services/persona.service';
import { Persona } from './../../../models/persona';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  public personas: Persona[];
  public personaActual: Persona = {
    id: 0,
    nombre: " ",
    apellido: " ",
    telefono: 0,

    domicilio: {
      id: 0,
      calle: " ",
      numero: 0,
      piso: 0,
      nroDepartamento: 0,
      aclaracion: " "
    }
  }

  pageActual: number = 1;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getAllPersonas();

  }

  /* Método que trae el conjunto de personas de la base de datos */
  getAllPersonas() {
    this.personaService.getAll().subscribe(res => {
      this.personas = res;
      console.log(this.personas);
    });
  }

  /* Método que subscribe al métodos delete del servicio y elimina un registro */
  delete(persona: Persona) {
    Swal.fire({
      title: 'Estas seguro?',
      text: " No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar Usuario!'
    }).then((result) => {
      if (result.value) {
        this.personaService.delete(persona.id).subscribe(
          res => {
            const indexPersona = this.personas.indexOf(persona);
          this.personas.splice(indexPersona, 1);
          }
        );
        Swal.fire(
          'Deleted!',
          'El Usuario fue eliminado con éxito',
          'success'
        )
      }
    })
  }

  /* Método que actualiza la persona actual al momento de actualizar */
  onPreUpdate(persona: Persona) {
    this.personaActual = persona;
  }

  //IMPLEMENTA trackBy
   trackByFn(index: number, i: Persona): number{
    return i.id;
   }


}

