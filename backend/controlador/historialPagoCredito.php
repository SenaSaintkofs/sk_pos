<?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/historialPagoCredito.php');

    global $conexion;

    $control = $_GET['control'];
    $historialPagoCredito = new HistorialPagoCredito($conexion);

    switch($control) {
        case 'consulta':
            $vec = $historialPagoCredito->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            $params = json_decode($json);
            $vec = $historialPagoCredito->insertar($params);
        break;
        case 'editar':
            $json = file_get_contents('php://input');
            $id = $_GET['id'];
            $params = json_decode($json);
            $vec = $historialPagoCredito->editar($id, $params);
        break;
        case 'eliminar':
            $id = $_GET['id'];
            $vec = $historialPagoCredito->eliminar($id);
        break;
    }

    $datos = json_encode($vec);
    header('Content-Type: application/json');
    echo $datos;

// http://localhost:8080/controlador/historialPagoCredito.php?control=consulta
?>

