import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Producto } from '../../servicios/producto';
import { Categoria } from '../../servicios/categoria';

@Component({
  selector: 'app-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  productos: any[] = [];
  listCategorias: any[] = [];
  buscarProducto: string = '';

  objProducto = {
    nombre: '',
    codigo_barras: '',
    stock: 0,
    id_categoria: '',
    unidad_medida: 'Unidad',
    costo_compra: 0,
    precio_venta: 0,
    controla_stock: true,
    imagen_url: ''
  };

  id_producto: number = 0;
  m_formulario: boolean = false;
  botones_formulario: boolean = false;
  validar_campos: boolean = true;

  constructor(
    private sProducto: Producto,
    private sCategoria: Categoria,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.cargarCategorias();
  }

  consulta(): void {
    this.sProducto.consulta().subscribe({
      next: (resultado: any) => {
        this.productos = Array.isArray(resultado) ? resultado : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  cargarCategorias(): void {
    this.sCategoria.consultar().subscribe({
      next: (res: any) => {
        this.listCategorias = Array.isArray(res) ? res : [];
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  mostrarFormulario(ver: boolean): void {
    this.m_formulario = ver;
    if (!ver) {
      this.limpiar();
    }
  }

  cargarDatos(item: any, id: number): void {
    this.botones_formulario = true;
    this.mostrarFormulario(true);
    this.id_producto = id;
    this.objProducto = {
      nombre: item.nombre || '',
      codigo_barras: item.codigo_barras || '',
      stock: item.stock || 0,
      id_categoria: item.id_categoria || '',
      unidad_medida: item.unidad_medida || 'Unidad',
      costo_compra: item.costo_compra || 0,
      precio_venta: item.precio_venta || 0,
      controla_stock: item.controla_stock == 1 || item.controla_stock === true,
      imagen_url: item.imagen_url || ''
    };
  }

  validar(funcion: string): void {
    if (!this.objProducto.nombre.trim() || !this.objProducto.id_categoria) {
      this.validar_campos = false;
      Swal.fire('Campos incompletos', 'El nombre y la categoría del producto son obligatorios.', 'warning');
      return;
    }
    this.validar_campos = true;

    if (funcion === 'guardar') {
      this.guardar();
    } else if (funcion === 'editar') {
      this.editar();
    }
  }

  guardar(): void {
    this.sProducto.insertar(this.objProducto).subscribe((datos: any) => {
      if (datos?.resultado?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Éxito!', 'Producto registrado correctamente.', 'success');
      }
    });
  }

  editar(): void {
    this.sProducto.editar(this.id_producto, this.objProducto).subscribe((datos: any) => {
      if (datos?.resultado?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Actualizado!', 'El producto ha sido modificado.', 'success');
      }
    });
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar este producto?',
      text: 'Se eliminará del inventario del minimercado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sProducto.eliminar(id).subscribe((datos: any) => {
          if (datos?.resultado?.toLowerCase() === 'ok') {
            this.consulta();
            Swal.fire('Eliminado', 'El producto fue eliminado con éxito.', 'success');
          }
        });
      }
    });
  }

  limpiar(): void {
    this.objProducto = {
      nombre: '',
      codigo_barras: '',
      stock: 0,
      id_categoria: '',
      unidad_medida: 'Unidad',
      costo_compra: 0,
      precio_venta: 0,
      controla_stock: true,
      imagen_url: ''
    };
    this.id_producto = 0;
    this.botones_formulario = false;
    this.validar_campos = true;
  }

  filtrarProductos(): any[] {
    if (!this.productos) return [];
    if (!this.buscarProducto.trim()) return this.productos;
    const filtro = this.buscarProducto.toLowerCase();
    return this.productos.filter(item =>
      item.nombre?.toLowerCase().includes(filtro) ||
      item.codigo_barras?.toLowerCase().includes(filtro)
    );
  }
}