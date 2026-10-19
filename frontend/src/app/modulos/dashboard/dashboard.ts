import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  iconPath: string;    
  bgColor: string;     
  iconColor: string;   
  badgeBg: string;     
  badgeText: string;   
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
export class Dashboard implements OnInit {
  
  // Simulación del usuario logueado. Prueba cambiando a 'CAJERO' o 'CLIENTE'
  public currentUser = {
    nombre: 'Carlos',
    rol: 'ADMINISTRADOR' 
  };

  public canViewFullDashboard = false;
  public canViewDashboardAtAll = false;

  // 1. KPIs principales del negocio
  public metrics: MetricCard[] = [
    { 
      title: 'Ventas de hoy', 
      value: '\$ 2.840.500', 
      change: '▲ 12.4% vs ayer', 
      iconPath: 'M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-3', 
      bgColor: 'bg-red-50', iconColor: 'text-red-600', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700'
    },
    { 
      title: 'Productos', 
      value: '248', 
      change: '8 con stock bajo', 
      iconPath: 'm3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7m-9 4v10', 
      bgColor: 'bg-red-50', iconColor: 'text-red-600', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700'
    },
    { 
      title: 'Clientes', 
      value: '1.284', 
      change: '▲ +34 este mes', 
      iconPath: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 
      bgColor: 'bg-red-50', iconColor: 'text-red-600', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700'
    },
    { 
      title: 'Pedidos', 
      value: '36', 
      change: '5 pendientes', 
      iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', 
      bgColor: 'bg-red-50', iconColor: 'text-red-600', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700'
    }
  ];

  // 2. Montos brutos de la semana (Se calculan porcentajes automáticamente)
  public weeklySales: WeeklyBar[] = [
    { day: 'L', amount: 1200000 },
    { day: 'M', amount: 1650000 },
    { day: 'X', amount: 980000 },
    { day: 'J', amount: 2100000 },
    { day: 'V', amount: 2600000 },
    { day: 'S', amount: 2840500, isToday: true }, 
    { day: 'D', amount: 550000 }
  ];

  // 3. Categorías de productos
  public categories: Category[] = [
    { name: 'Abarrotes', percentage: 42, color: 'bg-red-600' },
    { name: 'Bebidas', percentage: 28, color: 'bg-orange-500' },
    { name: 'Lácteos', percentage: 17, color: 'bg-amber-500' },
    { name: 'Snacks', percentage: 13, color: 'bg-yellow-500' }
  ];

  // 4. Últimas ventas del sistema
  public latestSales: Sale[] = [
    { id: '#10482', customer: 'María López', date: '04 Oct, 12:32', total: 86500, status: 'Pagada' },
    { id: '#10481', customer: 'Juan Pérez', date: '04 Oct, 12:18', total: 42900, status: 'Pagada' },
    { id: '#10480', customer: 'Cliente mostrador', date: '04 Oct, 11:57', total: 18700, status: 'Pagada' }
  ];

  // 5. Módulos de Accesos Rápidos
  public quickAccess: QuickTile[] = [
    { title: 'Ventas', desc: 'Registrar ventas', iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', progress: 85 }, 
    { title: 'Productos', desc: 'Catálogo e Inventario', iconPath: 'm3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7m-9 4v10', progress: 40 }, 
    { title: 'Categorías', desc: 'Clasificación de ítems', iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', progress: 13 }, 
    { title: 'Clientes', desc: 'Documentos y cuentas', iconPath: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8', progress: 60 },
    { title: 'Pedidos', desc: 'A proveedores', iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', progress: 25 },
    { title: 'Usuarios', desc: 'Roles y accesos', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', progress: 95 }
  ];

  ngOnInit() {
    const rol = this.currentUser.rol;
    
    // ADMINISTRADOR ve todo. EMPPLEADO solo accesos rápidos y últimas ventas
    this.canViewFullDashboard = (rol === 'ADMINISTRADOR');
    this.canViewDashboardAtAll = (rol === 'ADMINISTRADOR' || rol === 'EMPLEADO');

    if (this.canViewFullDashboard) {
      this.calculateWeeklyPercentages();
    }
  }

  private calculateWeeklyPercentages(): void {
    const maxAmount = Math.max(...this.weeklySales.map(bar => bar.amount));
    if (maxAmount > 0) {
      this.weeklySales = this.weeklySales.map(bar => ({
        ...bar,
        percentage: Math.round((bar.amount / maxAmount) * 100)
      }));
    } else {
      this.weeklySales = this.weeklySales.map(bar => ({ ...bar, percentage: 0 }));
    }
  }

  public navigateToModule(moduleTitle: string): void {
    console.log(`Navegando al módulo: ${moduleTitle}`);
  }
}
