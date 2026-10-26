<?php
    class Producto {
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion = $conexion;
        }

        public function consulta() {
            $sql = "SELECT P.*, C.nombre AS nombre_categoria FROM PRODUCTO P
                    INNER JOIN CATEGORIA C ON P.id_categoria = C.id_categoria
                    ORDER BY P.nombre";

            $res = mysqli_query($this->conexion, $sql) or die("Error en consulta de producto");
            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }
            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM PRODUCTO WHERE id_producto = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";
            return $vec;
        }

        public function insertar($params) {
            $controla_stock = isset($params->controla_stock) && $params->controla_stock ? 1 : 0;
            $imagen = isset($params->imagen_url) ? $params->imagen_url : 'NULL';
            // S/N codigo, se añade null para evitar duplicidad
            $codigo_barras = isset($params->codigo_barras) ? $params->codigo_barras : 'NULL';
            $sql = "INSERT INTO PRODUCTO (id_categoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock, imagen_url) 
                    VALUES ($params->id_categoria, '$codigo_barras', '$params->nombre', $params->stock, '$params->unidad_medida', $params->costo_compra, $params->precio_venta, $controla_stock, '$imagen')";
            
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";
            return $vec;
        }

        public function editar($id, $params) {
            $controla_stock = isset($params->controla_stock) && $params->controla_stock ? 1 : 0;
            $imagen = isset($params->imagen_url) ? $params->imagen_url : 'NULL';

            $sql = "UPDATE PRODUCTO SET 
                        id_categoria = $params->id_categoria, codigo_barras = 'codigo_barras', nombre = '$params->nombre', stock = $params->stock, unidad_medida = '$params->unidad_medida', costo_compra = $params->costo_compra, precio_venta = $params->precio_venta, controla_stock = $controla_stock, imagen_url = 'imagen' 
                    WHERE id_producto = $id";
                    
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";
            return $vec;
        }
    }
?>