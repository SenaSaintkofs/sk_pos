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
                    WHERE P.activo = TRUE ORDER BY P.nombre";

            $res = mysqli_query($this->conexion, $sql) or die("Error en consulta de producto");
            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }
            return $vec;
        }

        public function eliminar($id) {
            $vec = [];
            $sql = "UPDATE PRODUCTO SET activo = FALSE WHERE id_producto = $id";

            if (mysqli_query($this->conexion, $sql)) {
                $vec['resultado'] = "OK";
                $vec['mensaje'] = "Se desactivo el registro";
            } else {
                $vec['resultado'] = "ERROR";
                $vec['mensaje'] = "No se pudo actualizar el registro";
            }
            return $vec;
        }

        public function insertar($params) {
            $controla_stock = isset($params->controla_stock) && $params->controla_stock ? 1 : 0;            
            $imagen = !empty($params->imagen_url) ? "'" . mysqli_real_escape_string($this->conexion, $params->imagen_url) . "'" : "NULL";
            $codigo_barras = !empty($params->codigo_barras) ? "'" . mysqli_real_escape_string($this->conexion, $params->codigo_barras) . "'" : "NULL";
            $nombre = mysqli_real_escape_string($this->conexion, $params->nombre);
            $unidad = mysqli_real_escape_string($this->conexion, $params->unidad_medida);

            $sql = "INSERT INTO PRODUCTO (id_categoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock, imagen_url) 
                    VALUES ($params->id_categoria, $codigo_barras, '$nombre', $params->stock, '$unidad', $params->costo_compra, $params->precio_venta, $controla_stock, $imagen)";
            
            if (!mysqli_query($this->conexion, $sql)) {
                return ['resultado' => 'error', 'mensaje' => mysqli_error($this->conexion)];
            }

            return ['resultado' => 'ok', 'mensaje' => 'Se ha insertado el registro'];
        }

        public function editar($id, $params) {
            $controla_stock = isset($params->controla_stock) && $params->controla_stock ? 1 : 0;            
            $imagen = !empty($params->imagen_url) ? "'" . mysqli_real_escape_string($this->conexion, $params->imagen_url) . "'" : "NULL";
            $codigo_barras = !empty($params->codigo_barras) ? "'" . mysqli_real_escape_string($this->conexion, $params->codigo_barras) . "'" : "NULL";
            $nombre = mysqli_real_escape_string($this->conexion, $params->nombre);
            $unidad = mysqli_real_escape_string($this->conexion, $params->unidad_medida);

            $sql = "UPDATE PRODUCTO SET id_categoria = $params->id_categoria, codigo_barras = $codigo_barras, nombre = '$nombre', stock = $params->stock, unidad_medida = '$unidad', costo_compra = $params->costo_compra, precio_venta = $params->precio_venta, controla_stock = $controla_stock, imagen_url = $imagen 
                    WHERE id_producto = $id";
                    
            if (!mysqli_query($this->conexion, $sql)) {
                return ['resultado' => 'error', 'mensaje' => mysqli_error($this->conexion)];
            }

            return ['resultado' => 'ok', 'mensaje' => 'Se ha editado el registro'];
        }
    }
?>