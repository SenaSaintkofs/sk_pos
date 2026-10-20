import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../servicios/usuario';


@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  
  
  
  usuarios: any[] = [];
  buscarUsuario: string = '';
  
  objUsuario = {
    correo: '',
    clave: '',
    rol: 'EMPLEADO',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    numero_documento: '',
    telefono: ''
  };
  
  id_usuario: number = 0;
  validar_campos: boolean = true;
  m_formulario: boolean = false;
  botones_formulario: boolean = false;
  
  constructor(private sUsuario: Usuario, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.consulta();
  }
  
  consulta(): void {
    this.sUsuario.consulta().subscribe({
      next: (resultado: any) => {
        this.usuarios = resultado;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error(err)
    });
  }
  
  mostrarFormulario(dato: string): void {
    if (dato === 'ver') {
      this.m_formulario = true;
    } else {
      this.m_formulario = false;
      this.botones_formulario = false;
      this.limpiar();
    }
  }

  cargarDatos(item: any, id: number): void {
    this.botones_formulario = true;
    this.mostrarFormulario('ver');
    this.objUsuario = { ...item }; // Copia los datos al objeto del formulario
    this.id_usuario = id;
  }

  validar(funcion: string): void {
    if (!this.objUsuario.primer_nombre || !this.objUsuario.correo || !this.objUsuario.numero_documento || !this.objUsuario.rol) {
      this.validar_campos = false;
    } else {
      this.validar_campos = true;
      if (funcion === 'guardar') this.guardar();
      if (funcion === 'editar') this.editar();
    }
  }

  guardar(): void {
    this.sUsuario.insertar(this.objUsuario).subscribe((datos: any) => {
      if (datos['resultado']?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario('no ver');
      }
    });
  }

  editar(): void {
    this.sUsuario.editar(this.id_usuario, this.objUsuario).subscribe((datos: any) => {
      if (datos['resultado']?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario('no ver');
      }
    });
  }
  
  eliminar(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: 'El proceso no podrá ser revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sUsuario.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado']?.toLowerCase() === 'ok') {
            this.consulta();
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          }
        });
      }
    });
  }

  limpiar(): void {
    this.objUsuario = {
      correo: '',
      clave: '',
      rol: 'EMPLEADO',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      numero_documento: '',
      telefono: ''
    };
    this.id_usuario = 0;
    this.validar_campos = true;
  }

  filtrarUsuarios(): any[] {
    if (!this.usuarios) return [];
    if (!this.buscarUsuario.trim()) return this.usuarios;
    const filtro = this.buscarUsuario.toLowerCase();
    return this.usuarios.filter(item => 
      item.primer_nombre?.toLowerCase().includes(filtro) ||
      item.correo?.toLowerCase().includes(filtro) ||
      item.rol?.toLowerCase().includes(filtro) ||
      item.numero_documento?.includes(filtro)
    );
  }
}