<?php
    class Pedido {
        // Atributos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion = $conexion;
        }

        public function consulta() {
            $sql = "SELECT PE.*, PRO.nombre AS proveedor_nombre, DP.id_producto, DP.cantidad, DP.costo_unitario FROM PEDIDO PE
                    INNER JOIN PROVEEDOR PRO ON PE.id_proveedor = PRO.id_proveedor
                    LEFT JOIN DETALLE_PEDIDO DP ON PE.id_pedido = DP.id_pedido
                    ORDER BY fecha DESC";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado pedido");

            $vec = [];
            while($row = mysqli_fetch_assoc($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $sqlDetalle = "DELETE FROM DETALLE_PEDIDO WHERE id_pedido = $id";
            mysqli_query($this->conexion, $sqlDetalle);

            $sql = "DELETE FROM PEDIDO WHERE id_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha eliminado el registro";

            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO PEDIDO (id_proveedor, fecha, valor_total, estado_pago) VALUES ($params->id_proveedor, '$params->fecha', $params->valor_total, '$params->estado_pago')";
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $id_nuevo_pedido = mysqli_insert_id($this->conexion);

            if (isset($params->id_producto) && $params->id_producto > 0) {
                $sqlDetalle = "INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) 
                               VALUES ($id_nuevo_pedido, $params->id_producto, $params->cantidad, $params->costo_unitario)";
                mysqli_query($this->conexion, $sqlDetalle) or die("No se ha insertado el detalle del registro");
            }

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            // Actualizar la tabla principal PEDIDO
            $sql = "UPDATE PEDIDO SET id_proveedor = $params->id_proveedor, fecha = '$params->fecha', valor_total = $params->valor_total, estado_pago = '$params->estado_pago' WHERE id_pedido = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            // Actualizar o insertar el DETALLE_PEDIDO
            if (isset($params->id_producto) && $params->id_producto > 0) {
                $checkDetalle = mysqli_query($this->conexion, "SELECT * FROM DETALLE_PEDIDO WHERE id_pedido = $id");
                
                if (mysqli_num_rows($checkDetalle) > 0) {
                    $sqlDetalle = "UPDATE DETALLE_PEDIDO SET id_producto = $params->id_producto, cantidad = $params->cantidad, costo_unitario = $params->costo_unitario WHERE id_pedido = $id";
                } else {
                    $sqlDetalle = "INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) VALUES ($id, $params->id_producto, $params->cantidad, $params->costo_unitario)";
                }
                mysqli_query($this->conexion, $sqlDetalle) or die("No se ha actualizado el detalle del registro");
            }

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>