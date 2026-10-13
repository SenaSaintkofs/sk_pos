<?php
    class HistorialPagoCredito{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT HPG.*, CH.* FROM HISTORIAL_PAGOS_CREDITO HPG
                    INNER JOIN CREDITO_HISTORIAL CH ON HPG.id_credito = CH.id_credito
                    ORDER BY HPG.fecha_pago DESC";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        /*public function eliminar($id) {
            $sql = "DELETE FROM HISTORIAL_PAGOS_CREDITO WHERE id_pago = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }*/

        public function insertar($params) {
            $sql = "INSERT INTO HISTORIAL_PAGOS_CREDITO(id_credito, fecha_pago, valor_pagado) VALUES(id_credito = $params->id_credito, fecha_pago = '$params->fecha_pago', valor_pagado = $params->valor_pagado)"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE HISTORIAL_PAGOS_CREDITO SET id_credito = $params->id_credito, fecha_pago = '$params->fecha_pago', valor_pagado = $params->valor_pagado WHERE id_pago = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>