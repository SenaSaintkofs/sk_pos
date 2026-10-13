<?php
    class Producto{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT P.*, SC.nombre FROM PRODUCTO P
                    INNER JOIN SUBCATEGORIA SC ON P.id_subcategoria = SC.id_subcategoria
                    ORDER BY P.nombre";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM PRODUCTO VENTA WHERE id_producto = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO PRODUCTO(id_subcategoria, codigo_barras, nombre, stock, unidad_medida, costo_compra, precio_venta, controla_stock, imagen_url) VALUES(id_subcategoria = $params->id_subcategoria, codigo_barras = $params->codigo_barras, nombre = '$params->nombre', stock = $params->stock, unidad_medida = '$params->unidad_medida', costo_compra = $params->costo_compra, precio_venta = $params->precio_venta, controla_stock = $params->controla_stock, imagen_url = '$params->imagen_url')"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE PRODUCTO SET id_subcategoria = $params->id_subcategoria, codigo_barras = $params->codigo_barras, nombre = '$params->nombre', stock = $params->stock, unidad_medida = '$params->unidad_medida', costo_compra = $params->costo_compra, precio_venta = $params->precio_venta, controla_stock = $params->controla_stock, imagen_url = '$params->imagen_url' WHERE id_producto = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>