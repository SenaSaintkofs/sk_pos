<?php
// Lineas importantes para permiso CORS
header('Access-Control-Allow-Origin: *');
header('Acces-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

// Log de peticiones
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// cargar modelos
require_once('../modelo/conexion.php');
require_once('../modelo/login.php');

global $conexion;

// GET OK, se cambia a POST
// $json = json_decode(file_get_contents('php://input'), true);
$correo = $_POST['correo'] ?? '';
$clave = $_POST['clave'] ?? '';

$login = new Login($conexion);

$vec = $login->consultar($correo, $clave);

// Respuesta en json
$datos = json_encode($vec);
header('Content-Type: application/json');
echo $datos;

// http://localhost:8080/controlador/login.php?correo=admin@tienda.com&clave=123456
?>

