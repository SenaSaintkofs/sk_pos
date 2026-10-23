<?php
    class Venta {
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion = $conexion;
        }

        public function consulta() {
            $sql = "SELECT V.*, CONCAT_WS(' ', U.primer_nombre, U.primer_apellido) AS usuario FROM VENTA V
                    LEFT JOIN USUARIO U ON V.id_usuario_cliente = U.id_usuario
                    ORDER BY V.fecha DESC";

            $res = mysqli_query($this->conexion, $sql) or die("Error al consultar las ventas");

            $vec = [];
            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function insertar($params) {
            $id_cliente = (!empty($params->id_usuario_cliente)) ? intval($params->id_usuario_cliente) : "NULL";
            
            $sql = "INSERT INTO VENTA (id_usuario_cliente, subtotal, descuento_total, valor_envio, total, tipo_pago, comentario_envio, monto_recibido, cambio) 
                    VALUES ($id_cliente, $params->subtotal, $params->descuento_total, $params->valor_envio, $params->total, '$params->tipo_pago', '$params->comentario_envio', $params->monto_recibido, $params->cambio)";
            
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro de venta: " . mysqli_error($this->conexion));

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $id_cliente = (!empty($params->id_usuario_cliente)) ? intval($params->id_usuario_cliente) : "NULL";

            $sql = "UPDATE VENTA SET id_usuario_cliente = $id_cliente, subtotal = $params->subtotal,  descuento_total = $params->descuento_total, valor_envio = $params->valor_envio,  total = $params->total, tipo_pago = '$params->tipo_pago', comentario_envio = '$params->comentario_envio', monto_recibido = $params->monto_recibido, cambio = $params->cambio 
                    WHERE id_venta = $id";
                    
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM VENTA WHERE id_venta = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }
    }
?>
