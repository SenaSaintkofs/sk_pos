import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pedido } from '../../servicios/pedido';
@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})


export class Pedidos implements OnInit {
  pedidos: any[] = [];
  listProductos: any[] = [];
  listProveedores: any[] = [];
  buscarPedido: string = '';

  objPedido = {
    id_proveedor: '',
    id_producto: '',
    cantidad: 1,
    costo_unitario: 0,
    valor_total: 0,
    estado_pago: 'PAGADO'
  };

  id_pedido: number = 0;
  m_formulario: boolean = false;
  botones_formulario: boolean = false;

  constructor(
    private sPedido: Pedido,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.consulta();
    this.cargarListasAuxiliares();
  }

  // 1. Consultar pedidos principales y detalle unido
  consulta(): void {
    this.sPedido.consulta().subscribe({
      next: (resultado: any) => {
        this.pedidos = Array.isArray(resultado) ? resultado : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }

  // Cargar productos y proveedores para los selectores del modal
  cargarListasAuxiliares(): void {
    this.sPedido.consultarProductos().subscribe((res: any) => {
      this.listProductos = Array.isArray(res) ? res : [];
    });
    this.sPedido.consultarProveedores().subscribe((res: any) => {
      this.listProveedores = Array.isArray(res) ? res : [];
    });
  }

  // Actualiza el costo unitario automáticamente al cambiar de producto
  actualizarPrecioProducto(): void {
    const prodSeleccionado = this.listProductos.find(p => p.id_producto == this.objPedido.id_producto);
    if (prodSeleccionado) {
      this.objPedido.costo_unitario = parseFloat(prodSeleccionado.costo_compra) || 0;
      this.calcularTotal();
    }
  }

  // Cálculo automático del subtotal
  calcularTotal(): void {
    const cantidad = parseFloat(String(this.objPedido.cantidad)) || 0;
    const costo = parseFloat(String(this.objPedido.costo_unitario)) || 0;
    this.objPedido.valor_total = cantidad * costo;
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
    this.id_pedido = id;
    this.objPedido = {
      id_proveedor: item.id_proveedor,
      id_producto: item.id_producto || '',
      cantidad: item.cantidad || 1,
      costo_unitario: item.costo_unitario || 0,
      valor_total: item.valor_total || 0,
      estado_pago: item.estado_pago || 'PAGADO'
    };
  }

  validar(funcion: string): void {
    if (!this.objPedido.id_proveedor || !this.objPedido.id_producto || this.objPedido.cantidad <= 0) {
      Swal.fire('Campos incompletos', 'Seleccione un proveedor, un producto y una cantidad válida.', 'warning');
      return;
    }

    if (funcion === 'guardar') {
      this.guardar();
    } else if (funcion === 'editar') {
      this.editar();
    }
  }

  guardar(): void {
    this.sPedido.insertar(this.objPedido).subscribe((datos: any) => {
      if (datos?.resultado?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Éxito!', 'Pedido registrado correctamente.', 'success');
      }
    });
  }

  editar(): void {
    this.sPedido.editar(this.id_pedido, this.objPedido).subscribe((datos: any) => {
      if (datos?.resultado?.toLowerCase() === 'ok') {
        this.consulta();
        this.mostrarFormulario(false);
        Swal.fire('¡Actualizado!', 'El pedido ha sido modificado.', 'success');
      }
    });
  }

  eliminarPedido(id: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar este pedido?',
      text: 'Se revertirá el registro de compra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2a2f3a',
      cancelButtonColor: '#991b1b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sPedido.eliminar(id).subscribe((datos: any) => {
          if (datos?.resultado?.toLowerCase() === 'ok') {
            this.consulta();
            Swal.fire('Eliminado', 'El pedido fue eliminado.', 'success');
          }
        });
      }
    });
  }

  limpiar(): void {
    this.objPedido = {
      id_proveedor: '',
      id_producto: '',
      cantidad: 1,
      costo_unitario: 0,
      valor_total: 0,
      estado_pago: 'PAGADO'
    };
    this.id_pedido = 0;
    this.botones_formulario = false;
  }

  filtrarPedidos(): any[] {
    if (!this.pedidos) return [];
    if (!this.buscarPedido.trim()) return this.pedidos;
    const filtro = this.buscarPedido.toLowerCase();
    return this.pedidos.filter(item =>
      String(item.id_pedido).includes(filtro) ||
      item.proveedor_nombre?.toLowerCase().includes(filtro) ||
      item.estado_pago?.toLowerCase().includes(filtro)
    );
  }
}