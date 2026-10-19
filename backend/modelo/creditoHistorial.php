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
            $sql = "SELECT CH.*, V.* FROM CREDITO_HISTORIAL CH
                    INNER JOIN VENTA V ON CH.id_venta = V.id_venta
                    ORDER BY V.fecha DESC";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM CREDITO_HISTORIAL WHERE id_credito = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO CREDITO_HISTORIAL(id_venta, deuda_inicial, deuda_actual, estado) VALUES(id_venta = $params->id_venta, deuda_inicial = $params->deuda_inicial, deuda_actual = $params->deuda_actual, estado = $params->estado)"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE CREDITO_HISTORIAL SET id_venta = $params->id_venta, deuda_inicial = $params->deuda_inicial, deuda_actual = $params->deuda_actual, estado = $params->estado WHERE id_credito = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>