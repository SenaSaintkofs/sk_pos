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
            
            if (mysqli_query($this->conexion, $sql)) {
                $id_venta = mysqli_insert_id($this->conexion);

                if (isset($params->productos) && is_array($params->productos)) {
                    foreach ($params->productos as $prod) {
                        $id_producto = intval($prod->id_producto);
                        $cantidad = intval($prod->qty);
                        $precio_unitario = floatval($prod->price);
                        $descuento_aplicado = 0.00; 

                        // Insertar en DETALLE_VENTA
                        $sqlDetalle = "INSERT INTO DETALLE_VENTA (id_venta, id_producto, cantidad, precio_unitario, descuento_aplicado) 
                                    VALUES ($id_venta, $id_producto, $cantidad, $precio_unitario, $descuento_aplicado)";
                        mysqli_query($this->conexion, $sqlDetalle);

                        // Descontar stock del producto
                        $sqlStock = "UPDATE PRODUCTO SET stock = stock - $cantidad WHERE id_producto = $id_producto";
                        mysqli_query($this->conexion, $sqlStock);
                    }
                }

                $vec = [];
                $vec['resultado'] = "ok";
                $vec['mensaje'] = "Se ha insertado el registro y actualizado el stock";
                return $vec;
            } else {
                $vec = [];
                $vec['resultado'] = "error";
                $vec['mensaje'] = "No se inserto el registro de venta: " . mysqli_error($this->conexion);
                return $vec;
            }
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
