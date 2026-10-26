import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Producto } from '../../servicios/producto';
import { Venta } from '../../servicios/venta';
import { Usuario } from '../../servicios/usuario';

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  buscarProducto: string = '';

  // Cliente por defecto
  customer: { id_usuario: number | null; nombre: string; documento: string } = {
    id_usuario: null,
    nombre: 'Cliente mostrador',
    documento: '222222222'
  };
  clientes: any[] = []; // Lista de clientes para el modal
  // Descuento y Domicilio
  discountType: 'percent' | 'value' = 'percent';
  discountInput: number = 0;
  discountAmount: number = 0;
  deliveryCost: number = 0;
  deliveryNote: string = '';

  // Pago
  cashReceived: number = 0;
  paymentMethod: string = 'cash'; // 'cash' o 'qr'

  // Modales
  modals: { [key: string]: boolean } = {
    clientModal: false,
    discountModal: false,
    deliveryModal: false,
    cashModal: false
  };

  constructor(
    private sProducto: Producto,
    private sVenta: Venta,
    private sUsuario: Usuario,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarClientes();
  }

  cargarProductos(): void {
    this.sProducto.consulta().subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res) ? res : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  cargarClientes(): void {
    this.sUsuario.consulta().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.clientes = res.filter(u => u.rol === 'CLIENTE'); // Filtrar solo clientes
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  get filteredProducts(): any[] {
    if (!this.buscarProducto.trim()) return this.products;
    const filtro = this.buscarProducto.toLowerCase();
    return this.products.filter(p =>
      p.nombre?.toLowerCase().includes(filtro) ||
      p.codigo_barras?.toLowerCase().includes(filtro)
    );
  }

  // --- CARRITO ---
  addProduct(product: any): void {
    if (product.stock <= 0) {
      Swal.fire('Sin stock', 'Este producto no tiene unidades disponibles.', 'warning');
      return;
    }

    const item = this.cart.find(i => i.id_producto === product.id_producto);
    if (item) {
      if (item.qty < product.stock) {
        item.qty++;
      } else {
        Swal.fire('Stock límite', 'No puedes superar el stock disponible.', 'info');
      }
    } else {
      this.cart.push({
        id_producto: product.id_producto,
        name: product.nombre,
        price: parseFloat(product.precio_venta) || 0,
        stock: product.stock,
        qty: 1,
        code: product.codigo_barras || 'S/C',
        imagen_url: product.imagen_url || null
      });
    }
  }

  changeQty(index: number, delta: number): void {
    const item = this.cart[index];
    const nuevaCantidad = item.qty + delta;
    if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
      item.qty = nuevaCantidad;
    } else if (nuevaCantidad > item.stock) {
      Swal.fire('Stock límite', 'Has alcanzado el stock máximo.', 'info');
    }
  }

  updateQtyInput(index: number, event: any): void {
    const val = parseInt(event.target.value) || 1;
    const item = this.cart[index];
    if (val > item.stock) {
      item.qty = item.stock;
    } else {
      item.qty = Math.max(1, val);
    }
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  clearCart(): void {
    this.cart = [];
    this.discountAmount = 0;
    this.discountInput = 0;
    this.deliveryCost = 0;
    this.deliveryNote = '';
    this.cashReceived = 0;
  }

  // --- CÁLCULOS ---
  get subtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  get grandTotal(): number {
    return Math.max(0, this.subtotal - this.discountAmount + Number(this.deliveryCost || 0));
  }

  get change(): number {
    return Math.max(0, this.cashReceived - this.grandTotal);
  }

  // --- MODALES ---
  openModal(modalId: string): void {
    if (modalId === 'cashModal' && this.cart.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos antes de procesar el pago.', 'warning');
      return;
    }
    this.modals[modalId] = true;
  }

  closeModal(modalId: string): void {
    this.modals[modalId] = false;
  }

  applyDiscount(): void {
    if (this.discountType === 'percent') {
      this.discountAmount = (this.subtotal * this.discountInput) / 100;
    } else {
      this.discountAmount = this.discountInput;
    }
    this.closeModal('discountModal');
  }

  applyDelivery(): void {
    this.closeModal('deliveryModal');
  }

  selectClient(id: number | null, nombre: string, doc: string): void {
    this.customer = { id_usuario: id, nombre, documento: doc };
    this.closeModal('clientModal');
  }

  addCash(amount: number): void {
    this.cashReceived += amount;
  }

  // --- FINALIZAR VENTA ---
  finishPayment(): void {
    if (this.paymentMethod === 'cash' && this.cashReceived < this.grandTotal) {
      Swal.fire('Monto insuficiente', 'El efectivo recibido es menor al total de la venta.', 'warning');
      return;
    }

    const datosVenta = {
      id_usuario_cliente: this.customer.id_usuario,
      subtotal: this.subtotal,
      descuento_total: this.discountAmount,
      valor_envio: this.deliveryCost,
      total: this.grandTotal,
      tipo_pago: this.paymentMethod.toUpperCase(),
      comentario_envio: this.deliveryNote,
      monto_recibido: this.paymentMethod === 'cash' ? this.cashReceived : this.grandTotal,
      cambio: this.paymentMethod === 'cash' ? this.change : 0,
      productos: this.cart
    };

    this.sVenta.insertar(datosVenta).subscribe({
      next: (res: any) => {
        if (res?.resultado?.toLowerCase() === 'ok') {
          Swal.fire('¡Éxito!', 'Venta registrada y stock actualizado.', 'success');
          this.clearCart();
          this.closeModal('cashModal');
          this.cargarProductos(); // Refrescar stock visual
        } else {
          Swal.fire('Error', res?.mensaje || 'No se pudo procesar la venta.', 'error');
        }
      },
      error: (err) => {
        console.error('Error HTTP al procesar venta:', err);
        Swal.fire('Error', 'Ocurrió un error en el servidor.', 'error');
      }
    });
  }
}