-- 1. CREAR BASE DE DATOS Y CONFIGURACIÓN
CREATE DATABASE IF NOT EXISTS pos_sistema
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pos_sistema;

-- Tabla de Usuarios
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50) NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Categorías
CREATE TABLE CATEGORIA (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Proveedores
CREATE TABLE PROVEEDOR (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Productos (Conectada a CATEGORIA)
CREATE TABLE PRODUCTO (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    codigo_barras VARCHAR(100) NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    unidad_medida VARCHAR(20) NOT NULL,
    costo_compra DECIMAL(10,2) NOT NULL,
    precio_venta DECIMAL(10,2) NOT NULL,
    controla_stock BOOLEAN NOT NULL DEFAULT TRUE,
    imagen_url VARCHAR(255) NULL,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Pedidos (Compras a proveedores)
CREATE TABLE PEDIDO (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL,
    estado_pago VARCHAR(50) NOT NULL, -- PAGADO, PENDIENTE
    FOREIGN KEY (id_proveedor) REFERENCES PROVEEDOR(id_proveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Ventas
CREATE TABLE VENTA (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_cliente INT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    descuento_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    valor_envio DECIMAL(10,2) NULL DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    tipo_pago VARCHAR(50) NOT NULL, -- EFECTIVO, QR
    comentario_envio TEXT NULL,
    monto_recibido DECIMAL(10,2) NULL, -- efectivo
    cambio DECIMAL(10,2) NULL,        -- efectivo
    FOREIGN KEY (id_usuario_cliente) REFERENCES USUARIO(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla Detalles de Venta (carrito)
CREATE TABLE DETALLE_VENTA (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento_aplicado DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (id_venta) REFERENCES VENTA(id_venta) ON DELETE RESTRICT,
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla Detalles de Pedidos de Proveedores
CREATE TABLE DETALLE_PEDIDO (
    id_detalle_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

