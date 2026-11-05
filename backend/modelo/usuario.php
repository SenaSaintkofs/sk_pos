<?php
/*** 
 * En este archivo se define la clase Usuario, que se encarga de gestionar los usuarios.
 * La clase tiene un constructor que recibe la conexión a la base de datos y métodos para 
 * consultar, insertar, editar y eliminar (actualizar) usuarios.
 */
class Usuario
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT id_usuario, correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, CONCAT_WS(' ', primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) AS usuario, numero_documento, telefono FROM USUARIO WHERE activo = TRUE ORDER BY primer_nombre";

        $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado usuario");

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    public function eliminar($id)
    {
        $vec = [];
        $sql = "UPDATE USUARIO SET activo = FALSE WHERE id_usuario = ?";
        $stmt = mysqli_prepare($this->conexion, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "i", $id);
            if (mysqli_stmt_execute($stmt)) {
                $vec['resultado'] = "ok";
                $vec['mensaje'] = "Se cambió el registro a inactivo.";
            } else {
                $vec['resultado'] = "error";
                $vec['mensaje'] = "No se pudo inactivar el registro.";
            }
            mysqli_stmt_close($stmt);
        } else {
            $vec['resultado'] = "error";
            $vec['mensaje'] = "Error al preparar la consulta.";
        }
        return $vec;
    }
    /*
    USUARIO
    CATEGORIA
    PROVEEDOR
    PRODUCTO
    PEDIDO
    */

    public function insertar($params)
    {
        $claveEncriptada = password_hash($params->clave, PASSWORD_BCRYPT);

        $sql = "INSERT INTO USUARIO(correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = mysqli_prepare($this->conexion, $sql);
        if (!$stmt) {
            die("Error al preparar inserción: " . mysqli_error($this->conexion));
        }

        mysqli_stmt_bind_param(
            $stmt,
            "sssssssss",
            $params->correo,
            $claveEncriptada,
            $params->rol,
            $params->primer_nombre,
            $params->segundo_nombre,
            $params->primer_apellido,
            $params->segundo_apellido,
            $params->numero_documento,
            $params->telefono
        );

        mysqli_stmt_execute($stmt);

        $vec = [];
        $vec['resultado'] = "ok";
        $vec['mensaje'] = "Se ha insertado el registro";

        mysqli_stmt_close($stmt);
        return $vec;
    }

    public function editar($id, $params)
    {
        $esNuevaClave = (strlen($params->clave) !== 60);

        if ($esNuevaClave && !empty(trim($params->clave))) {
            $claveFinal = password_hash($params->clave, PASSWORD_BCRYPT);
        } else {
            $claveFinal = $params->clave;
        }

        $sql = "UPDATE USUARIO SET correo = ?, clave = ?, rol = ?, primer_nombre = ?, segundo_nombre = ?, primer_apellido = ?, segundo_apellido = ?, numero_documento = ?, telefono = ? WHERE id_usuario = ?";

        $stmt = mysqli_prepare($this->conexion, $sql);
        if (!$stmt) {
            die("Error al preparar actualización: " . mysqli_error($this->conexion));
        }

        mysqli_stmt_bind_param(
            $stmt,
            "sssssssssi",
            $params->correo,
            $claveFinal,
            $params->rol,
            $params->primer_nombre,
            $params->segundo_nombre,
            $params->primer_apellido,
            $params->segundo_apellido,
            $params->numero_documento,
            $params->telefono,
            $id
        );

        mysqli_stmt_execute($stmt);

        $vec = [];
        $vec['resultado'] = "ok";
        $vec['mensaje'] = "Se ha editado el registro";

        mysqli_stmt_close($stmt);
        return $vec;
    }
}
