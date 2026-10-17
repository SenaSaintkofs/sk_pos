import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../servicios/categoria';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categoria: any;

  objCategoria = {
    nombre: ''
  };

  id_categoria: number = 0; 
  validar_nombre = true;
  m_formulario = false;
  botones_formulario = false;

  constructor(private scate: Categoria) {}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(): void {
    this.scate.consultar().subscribe({
      next: (resultado: any) => {
        this.categoria = resultado;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  mostrarFormulario(dato: any): void {
    switch(dato) {
      case 'ver':
        this.m_formulario = true;
        break;
      case 'no ver':
        this.m_formulario = false;
        this.botones_formulario = false;
        break;
    }
  }

  // CARGAR DATOS
  cargarDatos(items: any, id: number): void {
    this.botones_formulario = true;
    this.mostrarFormulario('ver');
    
    this.objCategoria.nombre = items.nombre;
    
    // Almacena el ID en la variable global para que no se pierda
    this.id_categoria = id;
  }

  validar(funcion: any): void {
    if (this.objCategoria.nombre == '') {
      this.validar_nombre = false;
    } else {
      this.validar_nombre = true;

      // Evalúa qué método del servicio disparar
      if (funcion === 'guardar') {
        this.guardar();
      } else if (funcion === 'editar') {
        this.editar();
      }
    }
  }

  // Guardar nuevo registro 
  guardar(): void {
    this.scate.insertar(this.objCategoria).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok' || datos['resultado'] == 'OK') {
        this.consulta();
        this.limpiar();
        this.mostrarFormulario('no ver');
      }
    });
  }

  // Actualizar registro existente.
  editar(): void {
    this.scate.editar(this.id_categoria, this.objCategoria).subscribe((datos: any) => {
      if (datos['resultado'] == 'ok' || datos['resultado'] == 'OK') {
        this.consulta();
        this.limpiar();
        this.mostrarFormulario('no ver');
      }
    });
  }

  //  usar SweetAlert2 para delete / #1e222b #2a2f3a #991b1b #e5e7eb #C5A880
  eliminar(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar la categoría?',
      text: 'El proceso no podrá ser revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se invoca al servicio
        this.scate.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado'] == 'ok' || datos['resultado'] == 'OK') {
            this.consulta(); // Refresca la tabla automáticamente con el dato corregido
            Swal.fire(
              'Categoría eliminada',
              'El registro ha sido eliminado.',
              'success'
            );
          }
        });
      }
    });
  }

  // Limpieza del formulario 
  limpiar(): void {
    this.objCategoria = {
      nombre: ''
    };
    this.id_categoria = 0;
  }
}
