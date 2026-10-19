import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Proveedor } from '../../servicios/proveedor';
import { Producto } from '../../servicios/producto';
import { Pedido } from '../../servicios/pedido';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {
  // Listas de la db
  public listPedidos: any[] = [];
  public listProveedores: any[] = [];
  public listProductos: any[] = [];

  public buscarPedido: string = '';
  public m_formulario = false;
  public botones_formulario = false; // Guardar/Actualizar
  public id_pedido: number = 0;

  // Dato enlazado al formulario de los pasos (S1, S2, S3)
  public objPedido = {
    id_proveedor: 0,
    fecha: '',
    valor_total: 0,
    estado_pago: 'PENDIENTE',

    id_producto: 0,
    cantidad: 1,
    costo_unitario: 0
  };

  constructor(
    private sPedido: Pedido,
    private sProveedor: Proveedor,
    private sProducto: Producto,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarFechaActual();
    this.consulta();
    this.cargarProveedores();
    this.cargarProductos()
  }

  public consulta(): void {
    this.sPedido.consulta().subscribe({
      next: (resultado: any) => {
        this.listPedidos = resultado;
        this.cdr.detectChanges(); // forzar nueva carga
      },
      error: (err) => console.error('Error al traer pedidos:', err)
    });
  }

  // Trae datos de provedores
  private cargarProveedores(): void {
    this.sProveedor.consulta().subscribe((resultado: any) => {
      this.listProveedores = resultado;
      if (this.listProveedores.length > 0 && !this.botones_formulario) {
        this.objPedido.id_proveedor = this.listProveedores[0].id_proveedor;
      }
      this.cdr.detectChanges();
    });
  }

  // Trae datos de productos
  private cargarProductos(): void {
    this.sProducto.consulta().subscribe((resultado: any) => {
      this.listProductos = resultado;
      if (this.listProductos.length > 0 && !this.botones_formulario) {
        this.objPedido.id_producto = this.listProductos[0].id_producto;
        this.actualizarPrecioProducto();
      }
      this.cdr.detectChanges();
    });
  }

  public actualizarPrecioProducto(): void {
    const prodSeleccionado = this.listProductos.find(p => Number(p.id_producto) === Number(this.objPedido.id_producto));
    if (prodSeleccionado) {
      this.objPedido.costo_unitario = Number(prodSeleccionado.costo_compra);
      this.calcularTotal();
    }
  }

  // calcula el total al cambiar la cantidad o costo
  public calcularTotal(): void {
    this.objPedido.valor_total = this.objPedido.costo_unitario * this.objPedido.cantidad;
  }

  /**
   * cargarDatos
   */
  public cargarDatos(item: any, id: number): void {
    this.botones_formulario = true;
    this.mostrarFormulario(true);

    this.objPedido.id_proveedor = Number(item.id_proveedor);
    this.objPedido.fecha = item.fecha.substring(0, 10);
    this.objPedido.valor_total = Number(item.valor_total);
    this.objPedido.estado_pago = item.estado_pago;

    if (item.id_producto) this.objPedido.id_producto = Number(item.id_producto);
    this.objPedido.cantidad = item.cantidad ? Number(item.cantidad) : 1;
    this.objPedido.costo_unitario = this.objPedido.valor_total / this.objPedido.cantidad;

    this.id_pedido = id;
    this.cdr.detectChanges();
  }

  public validar(funcion: string): void {
    if (this.objPedido.id_proveedor <= 0 || this.objPedido.valor_total <= 0) {
      Swal.fire('Faltan Datos', 'Debe seleccionar un proveedor y revisar los montos.', 'warning');
    } else {
      if (funcion === 'guardar') {
        this.guardarPedido();
      } else if (funcion === 'editar') {
        this.editarPedido();
      }
    }
  }
  // inicio del CRUD - CREATE
  public guardarPedido(): void {
    // Formatear datos
    this.objPedido.id_proveedor = Number(this.objPedido.id_proveedor);
    this.objPedido.id_producto = Number(this.objPedido.id_producto);

    this.sPedido.insertar(this.objPedido).subscribe((datos: any) => {
      if (datos['resultado'] === 'ok') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Éxito!', 'El pedido se registró correctamente', 'success');
      }
    });
  }

  // UPDATE 
  public editarPedido(): void {
    this.sPedido.editar(this.id_pedido, this.objPedido).subscribe((datos: any) => {
      if (datos['resultado'] === 'ok' || datos['resultado'] === 'OK') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Actualizado!', 'El registro de compra fue modificado', 'success');
      }
    });
  }

  // DELETE
  public eliminarPedido(id: number): void {
    Swal.fire({
      title: '¿Eliminar pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sPedido.eliminar(id).subscribe((datos: any) => {
          if (datos['resultado'] === 'ok') {
            this.consulta();
            Swal.fire('Eliminado', 'El registro de compra fue removido', 'success');
          }
        });
      }
    });
  }

  public mostrarFormulario(dato: boolean): void {
    this.m_formulario = dato;
    if (!dato) {
      this.botones_formulario = false
      this.limpiar();
    } else {
      if (!this.botones_formulario) {
        if (this.listProveedores.length > 0) {
          this.objPedido.id_proveedor = Number(this.listProveedores[0].id_proveedor);
        }
        if (this.listProductos.length > 0) {
          this.objPedido.id_producto = Number(this.listProductos[0].id_producto);
          this.actualizarPrecioProducto();
        }
        this.calcularTotal();
      }
      this.cdr.detectChanges();
    }
  }
  // Inio de Utilidades: añadir fecha automatica
  private cargarFechaActual(): void {
    const hoy = new Date();
    this.objPedido.fecha = hoy.toISOString().substring(0, 10);
  }

  // quitar datos
  public limpiar(): void {
    this.objPedido.cantidad = 1;
    this.id_pedido = 0;
    this.cargarFechaActual();
    if (this.listProveedores.length > 0) this.objPedido.id_proveedor = this.listProveedores[0].id_proveedor;
    if (this.listProductos.length > 0) {
      this.objPedido.id_producto = this.listProductos[0].id_producto;
      this.actualizarPrecioProducto();
    }
  }

  // Buscardor 
  public filtrarPedidos(): any[] {
    if (!this.listPedidos) return [];
    if (!this.buscarPedido.trim()) return this.listPedidos;
    const texto = this.buscarPedido.toLowerCase();
    return this.listPedidos.filter(item => {
      const proveedor = item.proveedor_nombre ? item.proveedor_nombre.toLowerCase() : '';
      const orden = '#ord-' + item.id_pedido;
      return proveedor.includes(texto) || orden.includes(texto);
    });
  }
}
