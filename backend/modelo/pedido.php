<?php
class Pedido
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT p.id_pedido, p.id_proveedor, pr.nombre AS proveedor_nombre, p.fecha, p.valor_total, p.estado_pago,
                       dp.id_producto, dp.cantidad, dp.costo_unitario
                FROM PEDIDO p
                INNER JOIN PROVEEDOR pr ON p.id_proveedor = pr.id_proveedor
                LEFT JOIN DETALLE_PEDIDO dp ON p.id_pedido = dp.id_pedido
                ORDER BY p.id_pedido DESC";

        $res = mysqli_query($this->conexion, $sql);
        $vec = [];
        if ($res) {
            while ($row = mysqli_fetch_assoc($res)) {
                $vec[] = $row;
            }
        }
        return $vec;
    }

    public function insertar($params)
    {
        $sqlPedido = "INSERT INTO PEDIDO (id_proveedor, fecha, valor_total, estado_pago) 
                      VALUES ($params->id_proveedor, NOW(), $params->valor_total, '$params->estado_pago')";

        if (mysqli_query($this->conexion, $sqlPedido)) {
            $id_pedido = mysqli_insert_id($this->conexion);

            $sqlDetalle = "INSERT INTO DETALLE_PEDIDO (id_pedido, id_producto, cantidad, costo_unitario) 
                           VALUES ($id_pedido, $params->id_producto, $params->cantidad, $params->costo_unitario)";
            mysqli_query($this->conexion, $sqlDetalle);

            return ['resultado' => 'ok', 'mensaje' => 'Pedido registrado correctamente'];
        }

        return ['resultado' => 'error', 'mensaje' => mysqli_error($this->conexion)];
    }

    public function editar($id, $params)
    {
        $sqlPedido = "UPDATE PEDIDO SET id_proveedor = $params->id_proveedor, valor_total = $params->valor_total, estado_pago = '$params->estado_pago' 
                      WHERE id_pedido = $id";
        mysqli_query($this->conexion, $sqlPedido);

        $sqlDetalle = "UPDATE DETALLE_PEDIDO SET id_producto = $params->id_producto, cantidad = $params->cantidad, costo_unitario = $params->costo_unitario 
                       WHERE id_pedido = $id";
        mysqli_query($this->conexion, $sqlDetalle);

        return ['resultado' => 'ok', 'mensaje' => 'Pedido actualizado correctamente'];
    }

    public function eliminar($id)
    {
        mysqli_query($this->conexion, "DELETE FROM DETALLE_PEDIDO WHERE id_pedido = $id");
        mysqli_query($this->conexion, "DELETE FROM PEDIDO WHERE id_pedido = $id");

        return ['resultado' => 'ok', 'mensaje' => 'Pedido eliminado'];
    }
}
