<?php

// cargar CORS
require_once('config/cors.php');

// cargar modelos
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