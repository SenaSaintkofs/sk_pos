<?php
class Login
{
    // Atributos
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consultar($correo, $clave)
    {
        $sql = "SELECT *, CONCAT_WS(' ', primer_nombre, primer_apellido) AS nombre FROM USUARIO WHERE correo = ?";

        $stmt = mysqli_prepare($this->conexion, $sql);
        if (!$stmt) {
            die(json_encode(["error" => "Error al preparar la consulta"]));
        }

        mysqli_stmt_bind_param($stmt, "s", $correo);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);

        $vec = [];

        // Si usuario existe, verificar  contraseña
        if ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            if (password_verify($clave, $row['clave'])) {
                $row['validar'] = 'valida';
                $vec[] = $row;
            }
        }

        if (empty($vec)) {
            $vec[] = ['validar' => 'No valida'];
        }

        mysqli_stmt_close($stmt); // cerrar la consulta
        return $vec;
    }
}
