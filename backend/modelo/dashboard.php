<?php
class Dashboard {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerDatos() {
        $datos = [];

        // 1. Ventas de hoy y total de ventas
        $resVentasHoy = mysqli_query($this->conexion, "SELECT COALESCE(SUM(total), 0) as total_hoy FROM VENTA WHERE DATE(fecha) = CURDATE()");
        $datos['ventas_hoy'] = mysqli_fetch_assoc($resVentasHoy)['total_hoy'];

        // 2. Conteo de productos y stock bajo (stock <= 5)
        $resProductos = mysqli_query($this->conexion, "SELECT COUNT(*) as total_prod, SUM(CASE WHEN stock <= 5 THEN 1 ELSE 0 END) as stock_bajo FROM PRODUCTO");
        $rowProd = mysqli_fetch_assoc($resProductos);
        $datos['total_productos'] = $rowProd['total_prod'];
        $datos['stock_bajo'] = $rowProd['stock_bajo'];

        // 3. Conteo de clientes (usuarios con rol CLIENTE)
        $resClientes = mysqli_query($this->conexion, "SELECT COUNT(*) as total_cli FROM USUARIO WHERE rol = 'CLIENTE'");
        $datos['total_clientes'] = mysqli_fetch_assoc($resClientes)['total_cli'];

        // 4. Conteo de pedidos pendientes
        $resPedidos = mysqli_query($this->conexion, "SELECT COUNT(*) as total_ped, SUM(CASE WHEN estado_pago = 'PENDIENTE' THEN 1 ELSE 0 END) as pendientes FROM PEDIDO");
        $rowPed = mysqli_fetch_assoc($resPedidos);
        $datos['total_pedidos'] = $rowPed['total_ped'];
        $datos['pedidos_pendientes'] = $rowPed['pendientes'];

        // 5. Últimas ventas
        $resUltimasVentas = mysqli_query($this->conexion, "
            SELECT v.id_venta as id, COALESCE(CONCAT(u.primer_nombre, ' ', u.primer_apellido), 'Cliente mostrador') as customer, v.fecha as date, v.total, 'Pagada' as status 
            FROM VENTA v 
            LEFT JOIN USUARIO u ON v.id_usuario_cliente = u.id_usuario 
            ORDER BY v.fecha DESC LIMIT 5
        ");
        $ventasVec = [];
        while ($row = mysqli_fetch_assoc($resUltimasVentas)) {
            $ventasVec[] = $row;
        }
        $datos['ultimas_ventas'] = $ventasVec;

        // 6. Resumen por categorías
        $resCat = mysqli_query($this->conexion, "
            SELECT c.nombre as name, COUNT(p.id_producto) as total_prod
            FROM CATEGORIA c
            LEFT JOIN PRODUCTO p ON c.id_categoria = p.id_categoria
            GROUP BY c.id_categoria, c.nombre
        ");
        $catVec = [];
        $colores = ['bg-red-600', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500'];
        $i = 0;
        while ($row = mysqli_fetch_assoc($resCat)) {
            $row['color'] = $colores[$i % count($colores)];
            $catVec[] = $row;
            $i++;
        }
        $datos['categorias'] = $catVec;

        // 7. Ventas de la semana (últimos 7 días)
        $resSemana = mysqli_query($this->conexion, "
            SELECT DATE(fecha) as fecha, SUM(total) as total_dia 
            FROM VENTA 
            WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
            GROUP BY DATE(fecha)
            ORDER BY fecha ASC
        ");
        $semanaVec = [];
        while ($row = mysqli_fetch_assoc($resSemana)) {
            $semanaVec[] = $row;
        }
        $datos['ventas_semana'] = $semanaVec;

        return $datos;
    }
}
?>