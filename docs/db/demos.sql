USE pos_sistema;

-- 1. INSERTAR USUARIOS (Clientes, Empleados y Administradores)
INSERT INTO USUARIO (correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono, activo) VALUES
('demo@saintkofs.pw', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'ADMINISTRADOR', 'Demo', 'Santiago', 'Castro', 'Soto', '1054567890', '3214567890', TRUE),
('usuario@saintkofs.pw', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'EMPLEADO', 'Cajero', NULL, 'Castro', 'Rudas', '50607080', '3014567890', TRUE),
('santiago.cliente@correo.com', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'CLIENTE', 'Saint', 'Kofs', 'Salazar', 'Cano', '80901020', '3234567890', FALSE),
('otro.cliente@correo.com', '$2y$12$kdFOR7erz35mEeYKIeRgJOIBjkFI5VQB0efV06E.0CXv8Vw9.LBfS', 'CLIENTE', 'Don', 'Cliente', 'Castro', NULL, '40302010', '3334567890', TRUE);

-- 2. INSERTAR CATEGORIAS
INSERT INTO CATEGORIA (nombre, activo) VALUES
('Abarrotes', TRUE),
('Bebidas', TRUE),
('Campo', TRUE),
('Limpieza', TRUE);

-- 3. INSERTAR PROVEEDORES
INSERT INTO PROVEEDOR (nit, nombre, telefono, activo) VALUES
('800.123.456-1', 'Distribuidora Alimentos S.A.S.', '6015551234', TRUE),
('900.987.654-2', 'Bebidas de Colombia S.A.', '6024445678', TRUE),
('811.222.333-3', 'Leche la Granja', NULL, TRUE);

-- 4. INSERTAR PRODUCTOS
INSERT INTO PRODUCTO (id_categoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock, imagen_url, activo) VALUES
(1, '7701234567890', 'Arroz Blanco 1kg', 100, 'UNIDAD', 2500.00, 3200.00, TRUE, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500', TRUE),
(1, '7709876543210', 'Aceite de Girasol 1L', 50, 'UNIDAD', 8500.00, 11000.00, TRUE, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500', TRUE),
(2, '7702223334445', 'Gaseosa Cola 2L', 80, 'UNIDAD', 3500.00, 4800.00, TRUE, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500', TRUE),
(3, '7705556667778', 'Leche Entera 1L', 120, 'UNIDAD', 2800.00, 3600.00, TRUE, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500', TRUE),
(4, '7708889990001', 'Detergente en Polvo 1kg', 40, 'UNIDAD', 6000.00, 8200.00, TRUE, 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500', TRUE);

-- 5. INSERTAR PEDIDOS (Compras a proveedores)
INSERT INTO PEDIDO (id_proveedor, fecha, valor_total, estado_pago, activo) VALUES
(1, '2026-10-20 09:00:00', 675000.00, 'PAGADO', TRUE),
(3, '2026-10-21 14:30:00', 336000.00, 'PENDIENTE', TRUE);

-- 6. INSERTAR DETALLES DE PEDIDO
INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) VALUES
(1, 1, 100, 2500.00),
(1, 2, 50, 8500.00),
(2, 4, 120, 2800.00);

-- 7. INSERTAR VENTAS
INSERT INTO VENTA (id_usuario_cliente, id_usuario_empleado, fecha, subtotal, descuento_total, valor_envio, total, tipo_pago, comentario_envio, monto_recibido, cambio) VALUES
(3, 1, '2026-10-22 10:15:00', 17400.00, 0.00, 0.00, 17400.00, 'EFECTIVO', NULL, 20000.00, 2600.00),
(3, 1, '2026-10-23 11:00:00', 14400.00, 0.00, 5000.00, 19400.00, 'QR', 'Entregar en torre B', NULL, NULL);

-- 8. INSERTAR DETALLES DE VENTA
INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) VALUES
(1, 1, 2, 3200.00, 0.00),
(1, 2, 1, 11000.00, 0.00),
(2, 4, 2, 3600.00, 400.00),
(2, 3, 1, 4800.00, 0.00);
