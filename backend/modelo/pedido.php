<?php
    class Pedido{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT PE.*, PRO.nombre FROM PEDIDO PE
                    INNER JOIN PROVEEDOR PRO ON PE.id_proveedor = PRO.id_proveedor
                    ORDER BY fecha DESC";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        /*public function eliminar($id) {
            $sql = "DELETE FROM PEDIDO WHERE id_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }*/

        public function insertar($params) {
            $sql = "INSERT INTO PEDIDO(id_proveedor, fecha, valor_total, estado_pago) VALUES(id_proveedor = $params->id_proveedor, fecha = '$params->fecha', valor_total = $params->valor_total, estado_pago = '$params->estado_pago')"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE PEDIDO SET id_proveedor = $params->id_proveedor, fecha = '$params->fecha', valor_total = $params->valor_total, estado_pago = '$params->estado_pago' WHERE id_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>