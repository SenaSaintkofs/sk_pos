<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require_once('../modelo/conexion.php');
require_once('../modelo/dashboard.php');

global $conexion;
$dashboard = new Dashboard($conexion);

$control = $_GET['control'] ?? '';

$vec = [];
if ($control === 'resumen') {
    $vec = $dashboard->obtenerDatos();
}

echo json_encode($vec);
?>