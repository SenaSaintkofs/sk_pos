<?php

// cargar CORS
require_once('config/cors.php');

// cargar modelos
require_once('../modelo/conexion.php');
require_once('../modelo/dashboard.php');

global $conexion; // Variable Global a la DB
$dashboard = new Dashboard($conexion); // instanciar clase y pasarle la conexion a la DB

$control = $_GET['control'] ?? ''; // tomar dato de control por URL o asignar vacio

$vec = []; // definir vector de respuesta

// si el control es 'resumen', obtener los datos del dashboard
if ($control === 'resumen') {
    $vec = $dashboard->obtenerDatos();
}

echo json_encode($vec);
?>