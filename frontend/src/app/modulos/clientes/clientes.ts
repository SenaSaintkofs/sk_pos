import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../servicios/usuario';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {

  
  clientes: any[] = [];
  buscarCliente: string = '';
  
  objCliente = {
    primer_nombre: '',
    primer_apellido: '',
    numero_documento: '',
    telefono: '',
    correo: '',
    rol: 'CLIENTE',
    clave: 'temporal123' // Clave por defecto si la BD lo requiere
  };
  
  id_cliente: number = 0;
  validar_campos: boolean = true;
  m_formulario: boolean = false;
  botones_formulario: boolean = false;
  
  constructor(private sCliente: Usuario, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.consulta();
  }

  consulta(): void {
    this.sCliente.consulta().subscribe({
      next: (resultado: any) => {
        // Filtramos solo los usuarios que tengan el rol de CLIENTE
        this.clientes = resultado.filter((u: any) => u.rol === 'CLIENTE');
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
    this.objCliente = { ...item };
    this.id_cliente = id;
  }

  validar(funcion: string): void {
    if (!this.objCliente.primer_nombre || !this.objCliente.numero_documento) {
      this.validar_campos = false;
    } else {
      this.validar_campos = true;
      if (funcion === 'guardar') this.guardar();
      if (funcion === 'editar') this.editar();
    }
  }

  guardar(): void {
    this.sCliente.insertar(this.objCliente).subscribe((datos: any) => {
      if (datos['resultado']?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario('no ver');
      }
    });
  }

  editar(): void {
    this.sCliente.editar(this.id_cliente, this.objCliente).subscribe((datos: any) => {
      if (datos['resultado']?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario('no ver');
      }
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el cliente?',
      text: 'El proceso no podrá ser revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sCliente.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado']?.toLowerCase() === 'ok') {
            this.consulta();
            Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
          }
        });
      }
    });
  }
  
  limpiar(): void {
    this.objCliente = {
      primer_nombre: '',
      primer_apellido: '',
      numero_documento: '',
      telefono: '',
      correo: '',
      rol: 'CLIENTE',
      clave: 'temporal123'
    };
    this.id_cliente = 0;
    this.validar_campos = true;
  }
  
  filtrarClientes(): any[] {
    if (!this.clientes) return [];
    if (!this.buscarCliente.trim()) return this.clientes;
    const filtro = this.buscarCliente.toLowerCase();
    return this.clientes.filter(item => 
      item.primer_nombre?.toLowerCase().includes(filtro) ||
      item.primer_apellido?.toLowerCase().includes(filtro) ||
      item.numero_documento?.includes(filtro)
    );
  }
}