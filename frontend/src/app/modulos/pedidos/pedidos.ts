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
  public listPedidos: any[] = [];
  public listProveedores: any[] = [];
  public listProductos: any[] = [];

  public buscarPedido: string = '';
  public m_formulario = false;
  public botones_formulario = false; 
  public id_pedido: number = 0;

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
    this.cargarDatosIniciales();
  }

  // Carga paralela y segura para evitar que los selects arranquen vacíos
  private cargarDatosIniciales(): void {
    this.sProveedor.consulta().subscribe((resProv: any) => {
      this.listProveedores = Array.isArray(resProv) ? resProv : (resProv ? Object.values(resProv) : []);
      
      this.sProducto.consulta().subscribe((resProd: any) => {
        this.listProductos = Array.isArray(resProd) ? resProd : (resProd ? Object.values(resProd) : []);
        
        // Una vez tenemos ambas listas, consultamos los pedidos
        this.consulta();
        this.cdr.detectChanges();
      });
    });
  }

  public consulta(): void {
    this.sPedido.consulta().subscribe({
      next: (resultado: any) => {
        this.listPedidos = Array.isArray(resultado) ? resultado : (resultado ? [resultado] : []);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer pedidos:', err)
    });
  }

  public actualizarPrecioProducto(): void {
    const idBuscar = Number(this.objPedido.id_producto);
    const prodSeleccionado = this.listProductos.find(p => Number(p.id_producto) === idBuscar);

    if (prodSeleccionado) {
      this.objPedido.costo_unitario = Number(prodSeleccionado.costo_compra);
      this.calcularTotal();
    }
  }

  public calcularTotal(): void {
    this.objPedido.valor_total = Number(this.objPedido.costo_unitario) * Number(this.objPedido.cantidad);
  }

  public cargarDatos(item: any, id: number): void {
    this.botones_formulario = true;
    this.mostrarFormulario(true);

    setTimeout(() => {
      this.objPedido.id_proveedor = Number(item.id_proveedor);
      this.objPedido.fecha = item.fecha ? item.fecha.substring(0, 10) : '';
      this.objPedido.valor_total = Number(item.valor_total);
      this.objPedido.estado_pago = item.estado_pago;

      if (item.id_producto) {
        this.objPedido.id_producto = Number(item.id_producto);
      }

      this.objPedido.cantidad = item.cantidad ? Number(item.cantidad) : 1;
      this.objPedido.costo_unitario = this.objPedido.cantidad > 0 
        ? (this.objPedido.valor_total / this.objPedido.cantidad) 
        : Number(item.costo_unitario || 0);

      this.id_pedido = id;
      this.cdr.detectChanges();
    }, 50);
  }

  public validar(funcion: string): void {
    this.objPedido.id_proveedor = Number(this.objPedido.id_proveedor);
    this.objPedido.id_producto = Number(this.objPedido.id_producto);
    this.objPedido.valor_total = Number(this.objPedido.valor_total);
    this.objPedido.cantidad = Number(this.objPedido.cantidad);
    this.objPedido.costo_unitario = Number(this.objPedido.costo_unitario);

    if (this.objPedido.id_proveedor <= 0 || this.objPedido.id_producto <= 0 || this.objPedido.valor_total <= 0) {
      Swal.fire('Faltan Datos', 'Debe seleccionar un proveedor, un producto y verificar que las cantidades sean mayores a 0.', 'warning');
    } else {
      if (funcion === 'guardar') {
        this.guardarPedido();
      } else if (funcion === 'editar') {
        this.editarPedido();
      }
    }
  }

  public guardarPedido(): void {
    this.sPedido.insertar(this.objPedido).subscribe((datos: any) => {
      if (datos && (datos['resultado'] === 'ok' || datos['resultado'] === 'OK')) {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Éxito!', 'El pedido se registró correctamente', 'success');
      } else {
        Swal.fire('Error', 'El backend no pudo procesar la inserción', 'error');
      }
    });
  }

  public editarPedido(): void {
    this.sPedido.editar(this.id_pedido, this.objPedido).subscribe((datos: any) => {
      if (datos && (datos['resultado'] === 'ok' || datos['resultado'] === 'OK')) {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Actualizado!', 'El registro de compra fue modificado', 'success');
      } else {
        Swal.fire('Error', 'El backend no pudo actualizar el registro', 'error');
      }
    });
  }

  public eliminarPedido(id: number): void {
    Swal.fire({
      title: '¿Eliminar pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sPedido.eliminar(id).subscribe((datos: any) => {
          if (datos && (datos['resultado'] === 'ok' || datos['resultado'] === 'OK')) {
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
      this.botones_formulario = false;
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

  private cargarFechaActual(): void {
    const hoy = new Date();
    this.objPedido.fecha = hoy.toISOString().substring(0, 10);
  }

  public limpiar(): void {
    this.objPedido.cantidad = 1;
    this.id_pedido = 0;
    this.cargarFechaActual();
    if (this.listProveedores.length > 0) {
      this.objPedido.id_proveedor = Number(this.listProveedores[0].id_proveedor);
    }
    if (this.listProductos.length > 0) {
      this.objPedido.id_producto = Number(this.listProductos[0].id_producto);
      this.actualizarPrecioProducto();
    }
  }

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