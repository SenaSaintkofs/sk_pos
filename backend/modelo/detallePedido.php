<?php
    class DetallePedido{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT DP.*, PE.*, PRO.nombre FROM DETALLE_PEDIDO DP
                    INNER JOIN PEDIDO PE ON DP.id_pedido = PE.id_pedido
                    INNER JOIN PRODUCTO PRO ON DP.id_producto = PRO.id_producto
                    ORDER BY PE.fecha";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        /*public function eliminar($id) {
            $sql = "DELETE FROM DETALLE_PEDIDO WHERE id_detalle_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }*/

        public function insertar($params) {
            $sql = "INSERT INTO DETALLE_PEDIDO(id_pedido, id_producto, cantidad, costo_unitario) VALUES(id_pedido = $params->id_pedido, id_producto = $params->id_producto, cantidad = $params->cantidad, costo_unitario = $params->costo_unitario)"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE DETALLE_PEDIDO SET id_pedido = $params->id_pedido, id_producto = $params->id_producto, cantidad = $params->cantidad, costo_unitario = $params->costo_unitario WHERE id_detalle_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>