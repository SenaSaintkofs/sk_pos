USE pos_sistema;

-- 1. INSERTAR USUARIOS (Clientes, Empleados y Administradores)
INSERT INTO USUARIO (correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono) VALUES
('demo@saintkofs.pw', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'ADMINISTRADOR', 'Demo', 'Santiago', 'Castro', 'Soto', '1054567890', '3214567890'),
('usuario@sistema.pw', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'EMPLEADO', 'Cajero', NULL, 'Castro', 'Rudas', '50607080', '3014567890'),
('santiago.cliente@correo.com', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'CLIENTE', 'Saint', 'Kofs', 'Salazar', 'Cano', '80901020', '3234567890'),
('otro.cliente@correo.com', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'CLIENTE', 'Don', 'Cliente', 'Castro', NULL, '40302010', '3334567890');

-- 2. INSERTAR CATEGORÍAS
INSERT INTO CATEGORIA (nombre) VALUES
('Abarrotes'),
('Bebidas'),
('Lácteos'),
('Limpieza');

-- 3. INSERTAR PROVEEDORES
INSERT INTO PROVEEDOR (nit, nombre, telefono) VALUES
('800.123.456-1', 'Distribuidora Alimentos S.A.S.', '6015551234'),
('900.987.654-2', 'Bebidas del País S.A.', '6024445678'),
('811.222.333-3', 'Lácteos la Granja', NULL);

-- 4. INSERTAR PRODUCTOS
-- El precio_venta es superior al costo_compra para mantener lógica de negocio
INSERT INTO PRODUCTO (id_categoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock) VALUES
(1, '7701234567890', 'Arroz Blanco 1kg', 100, 'UNIDAD', 2500.00, 3200.00, TRUE),
(1, '7709876543210', 'Aceite de Girasol 1L', 50, 'UNIDAD', 8500.00, 11000.00, TRUE),
(2, '7702223334445', 'Gaseosa Cola 2L', 80, 'UNIDAD', 3500.00, 4800.00, TRUE),
(3, '7705556667778', 'Leche Entera 1L', 120, 'UNIDAD', 2800.00, 3600.00, TRUE),
(4, '7708889990001', 'Detergente en Polvo 1kg', 40, 'UNIDAD', 6000.00, 8200.00, TRUE);

-- 5. INSERTAR PEDIDOS (Compras a proveedores)
-- Pedido 1: A Distribuidora Alimentos (Arroz y Aceite) -> Total: (100*2500) + (50*8500) = 250000 + 425000 = 675000
INSERT INTO PEDIDO (id_proveedor, fecha, valor_total, estado_pago) VALUES
(1, '2026-10-20 09:00:00', 675000.00, 'PAGADO'),
-- Pedido 2: A Lácteos la Granja (Leche) -> Total: 120 * 2800 = 336000
(3, '2026-10-21 14:30:00', 336000.00, 'PENDIENTE');

-- 6. INSERTAR DETALLES DE PEDIDO
INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) VALUES
(1, 1, 100, 2500.00),
(1, 2, 50, 8500.00),
(2, 4, 120, 2800.00);

-- 7. INSERTAR VENTAS
-- Venta 1: Efectivo. 2 Arroz (6400) + 1 Aceite (11000) = 17400. Recibe 20000, cambio 2600.
INSERT INTO VENTA (id_usuario_cliente, fecha, subtotal, descuento_total, valor_envio, total, tipo_pago, comentario_envio, monto_recibido, cambio) VALUES
(3, '2026-10-22 10:15:00', 17400.00, 0.00, 0.00, 17400.00, 'EFECTIVO', NULL, 20000.00, 2600.00),
-- Venta 2: Crédito. 1 Detergente (8200) + 2 Leches (7200) = 15400. Descuento de 400. Total = 15000.
(4, '2026-10-22 16:45:00', 15400.00, 400.00, 0.00, 15000.00, 'CREDITO', NULL, NULL, NULL),
-- Venta 3: Con Envío y pago QR. 3 Gaseosas = 14400 + 5000 envío = 19400.
(3, '2026-10-23 11:00:00', 14400.00, 0.00, 5000.00, 19400.00, 'QR', 'Entregar en portería torre B', NULL, NULL);

-- 8. INSERTAR DETALLES DE VENTA
INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) VALUES
-- Detalles Venta 1
(1, 1, 2, 3200.00, 0.00),
(1, 2, 1, 11000.00, 0.00),
-- Detalles Venta 2
(2, 5, 1, 8200.00, 0.00),
(2, 4, 2, 3600.00, 400.00), -- Se aplicó el descuento aquí
-- Detalles Venta 3
(3, 3, 3, 4800.00, 0.00);

-- 9. INSERTAR CONTROL DE CRÉDITOS
-- El crédito se genera de la Venta 2 (Total: 15000)
INSERT INTO CREDITO_HISTORIAL (id_venta, deuda_inicial, deuda_actual, estado) VALUES
(2, 15000.00, 5000.00, 'PENDIENTE'); -- Ya abonó 10000, debe 5000

-- 10. INSERTAR HISTORIAL DE ABONOS A CRÉDITOS
-- Abono para el crédito anterior
INSERT INTO HISTORIAL_PAGOS_CREDITO (id_credito, fecha_pago, valor_pagado) VALUES
(1, '2026-10-23 08:30:00', 10000.00);
