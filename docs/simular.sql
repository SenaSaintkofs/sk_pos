USE pos_sistema;

-- ==========================================
-- 1. DATOS DE PRUEBA: USUARIOS
-- (Las claves simulan un hash encriptado de tipo bcrypt/argon2)
-- ==========================================
INSERT INTO USUARIO (correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono) VALUES
('admin@tienda.com', '$2y$10$Z3x8K9bJLeE6WRY8Gv0MbuMvWw67Mh29lQ.6O2xV/7Y8Dq07rM6pe', 'ADMINISTRADOR', 'Carlos', 'Alberto', 'Gómez', 'Pérez', '10203040', '3151234567'),
('cajero@tienda.com', '$2y$10$Z3x8K9bJLeE6WRY8Gv0MbuMvWw67Mh29lQ.6O2xV/7Y8Dq07rM6pe', 'CAJERO', 'Ana', 'María', 'Rodríguez', NULL, '50607080', '3109876543'),
('cliente.fiel@correo.com', '$2y$10$Z3x8K9bJLeE6WRY8Gv0MbuMvWw67Mh29lQ.6O2xV/7Y8Dq07rM6pe', 'CLIENTE', 'Juan', NULL, 'Martínez', 'Lopez', '80901020', '3201112223');

-- ==========================================
-- 2. DATOS DE PRUEBA: CATEGORÍAS
-- ==========================================
INSERT INTO CATEGORIA (nombre) VALUES
('Bebidas'),
('Snacks y Pasabocas'),
('Aseo Hogar');

-- ==========================================
-- 3. DATOS DE PRUEBA: SUBCATEGORÍAS
-- ==========================================
INSERT INTO SUBCATEGORIA (id_categoria, nombre) VALUES
(1, 'Gaseosas'),      -- Pertenece a Bebidas (id 1)
(1, 'Jugos y Aguas'),  -- Pertenece a Bebidas (id 1)
(2, 'Papas y Fritos'), -- Pertenece a Snacks (id 2)
(3, 'Detergentes');    -- Pertenece a Aseo Hogar (id 3)

-- ==========================================
-- 4. DATOS DE PRUEBA: PRODUCTOS
-- ==========================================
INSERT INTO PRODUCTO (id_subcategoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock, imagen_url) VALUES
(1, '7701234567891', 'Coca Cola 1.5 Litros', 50, 'UNIDAD', 2500.00, 3800.00, TRUE, 'https://url-imagen.com'),
(1, '7701234567892', 'Agua Mineral Con Gas 500ml', 30, 'UNIDAD', 1000.00, 1800.00, TRUE, NULL),
(3, '7701234567893', 'Papas Margarita Pollo Mega', 25, 'UNIDAD', 1800.00, 2800.00, TRUE, NULL),
(4, '7701234567894', 'Detergente Líquido 1L', 15, 'UNIDAD', 7000.00, 11500.00, TRUE, 'https://url-imagen.com');

-- ==========================================
-- 5. DATOS DE PRUEBA: PROVEEDORES
-- ==========================================
INSERT INTO PROVEEDOR (nit, nombre, telefono) VALUES
('800.123.456-1', 'Distribuidora de Bebidas del Centro', '6015551234'),
('900.987.654-2', 'Fritos y Snacks S.A.S.', '6024449876');

-- ==========================================
-- 6. DATOS DE PRUEBA: PEDIDOS (Compras al proveedor)
-- ==========================================
-- Pedido de reabastecimiento pagado al proveedor 1
INSERT INTO PEDIDO (id_proveedor, fecha, valor_total, estado_pago) VALUES
(1, NOW() - INTERVAL 5 DAY, 155000.00, 'PAGADO');

-- Detalles del pedido anterior (Mete productos al inventario)
INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) VALUES
(1, 1, 50, 2500.00), -- 50 Coca Colas a 2500 c/u = 125000
(1, 2, 30, 1000.00); -- 30 Aguas a 1000 c/u = 30000

-- ==========================================
-- 7. DATOS DE PRUEBA: VENTAS (Facturas)
-- ==========================================
-- Venta 1: Cliente de mostrador saca en EFECTIVO (id_usuario_cliente es NULL)
INSERT INTO VENTA (id_usuario_cliente, fecha, subtotal, descuento_total, valor_envio, total, tipo_pago, comentario_envio, monto_recibido, cambio) VALUES
(NULL, NOW() - INTERVAL 2 DAY, 10400.00, 0.00, 0.00, 10400.00, 'EFECTIVO', NULL, 20000.00, 9600.00);

-- Venta 2: Venta registrada a Juan Martínez (id_usuario 3) bajo la modalidad de CRÉDITO (Fiar)
INSERT INTO VENTA (id_usuario_cliente, fecha, subtotal, descuento_total, valor_envio, total, tipo_pago, comentario_envio, monto_recibido, cambio) VALUES
(3, NOW() - INTERVAL 1 DAY, 14300.00, 500.00, 0.00, 13800.00, 'CREDITO', NULL, 0.00, 0.00);

-- ==========================================
-- 8. DATOS DE PRUEBA: DETALLES DE VENTAS
-- ==========================================
-- Detalles Venta 1 (Mostrador sacó: 2 Coca Colas y 1 Papa Margarita)
INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) VALUES
(1, 1, 2, 3800.00, 0.00), -- 2 * 3800 = 7600
(1, 3, 1, 2800.00, 0.00); -- 1 * 2800 = 2800

-- Detalles Venta 2 (El cliente que fió sacó: 1 Detergente y 1 Coca Cola con descuento)
INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) VALUES
(2, 4, 1, 11500.00, 0.00), -- 1 * 11500 = 11500
(2, 1, 1, 3800.00, 500.00);  -- 1 * 3800 = 3800 (menos 500 de descuento)

-- ==========================================
-- 9. DATOS DE PRUEBA: CONTROL DE CRÉDITOS
-- ==========================================
-- Se genera la deuda inicial vinculada a la Venta 2 por un total de 13800.
-- Al iniciar, la deuda actual es 13800.
INSERT INTO CREDITO_HISTORIAL (id_venta, deuda_inicial, deuda_actual, estado) VALUES
(2, 13800.00, 13800.00, 'PENDIENTE');

-- ==========================================
-- 10. DATOS DE PRUEBA: ABONOS A CRÉDITOS
-- ==========================================
-- Supongamos que hoy el cliente vino y abonó 5000 a su cuenta (id_credito 1)
INSERT INTO HISTORIAL_PAGOS_CREDITO (id_credito, fecha_pago, valor_pagado) VALUES
(1, NOW(), 5000.00);

-- Actualizamos el estado de la deuda restándole el abono directamente en la tabla de créditos
UPDATE CREDITO_HISTORIAL
SET deuda_actual = deuda_actual - 5000.00
WHERE id_credito = 1;
