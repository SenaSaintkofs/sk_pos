<?php
class Usuario {
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta() {
        $sql = "SELECT id_usuario, correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, CONCAT_WS(' ', primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) AS usuario, numero_documento, telefono FROM USUARIO ORDER BY primer_nombre";

        $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado usuario");

        $vec = [];
        while($row = mysqli_fetch_array($res)){
            $vec[] = $row;
        }

        return $vec;
    }

    public function eliminar($id) {
        $sql = "DELETE FROM USUARIO WHERE id_usuario = ?";
        $stmt = mysqli_prepare($this->conexion, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);

        $vec = [];
        $vec['resultado'] = "ok";
        $vec['mensaje'] = "Se elimino el registro";

        mysqli_stmt_close($stmt);
        return $vec;
    }

    public function insertar($params) {
        $claveEncriptada = password_hash($params->clave, PASSWORD_BCRYPT);

        $sql = "INSERT INTO USUARIO(correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = mysqli_prepare($this->conexion, $sql);
        if (!$stmt) {
            die("Error al preparar inserción: " . mysqli_error($this->conexion));
        }

        mysqli_stmt_bind_param($stmt, "sssssssss", 
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

    public function editar($id, $params) {
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

        mysqli_stmt_bind_param($stmt, "sssssssssi", 
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
?>
