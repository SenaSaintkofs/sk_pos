<?php
    class DetalleVenta{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT DV.*, V.*, P.* FROM DETALLE_VENTA DV
                    INNER JOIN VENTA V ON DV.id_venta = V.id_venta
                    INNER JOIN PRODUCTO P ON DV.id_producto = P.id_producto
                    ORDER BY id_detalle DESC";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        /*public function eliminar($id) {
            $sql = "DELETE FROM DETALLE_VENTA WHERE id_detalle = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }*/

        public function insertar($params) {
            $sql = "INSERT INTO DETALLE_VENTA(id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) VALUES(id_venta = $params->id_venta, id_producto = $params->id_producto, cantidad = $params->cantidad, precio_unitario = $params->precio_unitario, descuento_aplicado = $params->descuento_aplicado)"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE DETALLE_VENTA SET id_venta = $params->id_venta, id_producto = $params->id_producto, cantidad = $params->cantidad, precio_unitario = $params->precio_unitario, descuento_aplicado = $params->descuento_aplicado WHERE id_detalle = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>