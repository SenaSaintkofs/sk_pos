import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Dashboard } from '../../servicios/dashboard'; // Asegúrate de que tu servicio se llame DashboardService

interface MetricCard {
  title: string;
  value: string;
  change: string;
  iconPath: string;    
  bgColor: string;     
  iconColor: string;   
}

interface WeeklyBar {
  day: string;
  amount: number;       
  percentage?: number;  
  isToday?: boolean;   
}

interface Sale {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

interface Category {
  name: string;
  percentage: number;
  color: string;
}

interface QuickTile {
  title: string;
  desc: string;
  iconPath: string;     
  progress: number; 
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit { 
  
  public currentUser = {
    nombre: '',
    rol: '' 
  };

  public canViewFullDashboard = false;
  public canViewDashboardAtAll = false;

  public metrics: MetricCard[] = [];
  public weeklySales: WeeklyBar[] = [];
  public categories: Category[] = [];
  public latestSales: Sale[] = [];

  public quickAccess: QuickTile[] = [
    { title: 'Ventas', desc: 'Registrar ventas', iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', progress: 85 }, 
    { title: 'Productos', desc: 'Catálogo e Inventario', iconPath: 'm3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7m-9 4v10', progress: 40 }, 
    { title: 'Categorías', desc: 'Clasificación de ítems', iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', progress: 13 }, 
    { title: 'Clientes', desc: 'Documentos y cuentas', iconPath: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8', progress: 60 },
    { title: 'Pedidos', desc: 'A proveedores', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', progress: 25 },
    { title: 'Usuarios', desc: 'Roles y accesos', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', progress: 95 }
  ];

  constructor(
    private router: Router,
    private sDashboard: Dashboard,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentUser.nombre = sessionStorage.getItem('nombre') || 'Usuario';
    this.currentUser.rol = sessionStorage.getItem('rol') || 'ADMINISTRADOR';
    const rol = this.currentUser.rol;
    
    this.canViewFullDashboard = (rol === 'ADMINISTRADOR');
    this.canViewDashboardAtAll = (rol === 'ADMINISTRADOR' || rol === 'EMPLEADO' || rol === 'CLIENTE');

    if (this.canViewFullDashboard) {
      this.cargarDatosReales();
    }
  }

  private cargarDatosReales(): void {
    this.sDashboard.obtenerResumen().subscribe({
      next: (res: any) => {
        if (!res) return;

        this.metrics = [
          { 
            title: 'Ventas de hoy', 
            value: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(res.ventas_hoy || 0), 
            change: 'Actualizado hoy', 
            iconPath: 'M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-3', 
            bgColor: 'bg-red-50', iconColor: 'text-red-600'
          },
          { 
            title: 'Productos', 
            value: String(res.total_productos || 0), 
            change: `${res.stock_bajo || 0} con stock bajo`, 
            iconPath: 'm3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7m-9 4v10', 
            bgColor: 'bg-red-50', iconColor: 'text-red-600'
          },
          { 
            title: 'Clientes', 
            value: String(res.total_clientes || 0), 
            change: 'Registrados', 
            iconPath: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 
            bgColor: 'bg-red-50', iconColor: 'text-red-600'
          },
          { 
            title: 'Pedidos', 
            value: String(res.total_pedidos || 0), 
            change: `${res.pedidos_pendientes || 0} pendientes`, 
            iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', 
            bgColor: 'bg-red-50', iconColor: 'text-red-600'
          }
        ];

        this.latestSales = res.ultimas_ventas || [];

        const totalProdAll = res.categorias?.reduce((acc: number, c: any) => acc + parseInt(c.total_prod), 0) || 1;
        this.categories = (res.categorias || []).map((c: any) => ({
          name: c.name,
          percentage: Math.round((parseInt(c.total_prod) / totalProdAll) * 100),
          color: c.color
        }));

        this.weeklySales = (res.ventas_semana || []).map((v: any) => ({
          day: v.fecha,
          amount: parseFloat(v.total_dia)
        }));
        this.calculateWeeklyPercentages();

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar dashboard:', err)
    });
  }

  private calculateWeeklyPercentages(): void {
    const maxAmount = Math.max(...this.weeklySales.map(bar => bar.amount), 1);
    this.weeklySales = this.weeklySales.map(bar => ({
      ...bar,
      percentage: Math.round((bar.amount / maxAmount) * 100)
    }));
  }

  public navigateToModule(moduleTitle: string): void {
    const rutasMap: { [key: string]: string } = {
      'Ventas': '/ventas',
      'Productos': '/productos',
      'Categorías': '/categorias',
      'Clientes': '/clientes',
      'Pedidos': '/pedidos',
      'Usuarios': '/usuarios'
    };
    const rutaDestino = rutasMap[moduleTitle];
    if (rutaDestino) {
      this.router.navigate([rutaDestino]);
    }
  }
}