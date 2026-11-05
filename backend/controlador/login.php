<?php
// cargar CORS
require_once('config/cors.php');

// cargar modelos
require_once('../modelo/conexion.php');
require_once('../modelo/login.php');

global $conexion; // Variable Global a la DB

// GET OK, se cambia a POST
// $json = json_decode(file_get_contents('php://input'), true);

// tomar datos de correo y clave desde POST o asignar vacio si no existen
$correo = $_POST['correo'] ?? '';
$clave = $_POST['clave'] ?? '';

$login = new Login($conexion); // instanciar clase y pasarle la conexion a la DB

$vec = $login->consultar($correo, $clave); // llamar al metodo consultar de la clase Login y pasarle correo y clave

// Respuesta en json
$datos = json_encode($vec);
header('Content-Type: application/json');
echo $datos;

// http://localhost:8080/controlador/login.php?correo=admin@tienda.com&clave=123456
?>

