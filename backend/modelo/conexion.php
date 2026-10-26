<?php

$servidor   = getenv('DB_HOST') ?: "localhost"; 
$usuario    = getenv('DB_USER') ?: "root";       
$clave      = getenv('DB_PASS') ?: "";             
$base_datos = getenv('DB_NAME') ?: "pos_sistema";  

$conexion = mysqli_connect($servidor, $usuario, $clave) or die("No se conectó a MySQL");
mysqli_select_db($conexion, $base_datos) or die("No se conectó a la base de datos");
mysqli_set_charset($conexion, "utf8mb4"); // Tipo de Codificacion

?>
