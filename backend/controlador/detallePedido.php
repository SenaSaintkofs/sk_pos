<?php
    // Lineas importantes para permiso CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin; X-Requested-With, Content-Type, Accept');

    require_once('../modelo/conexion.php');
    require_once('../modelo/detallePedido.php');

    global $conexion;

    $control = $_GET['control'];
    $detallePedido = new DetallePedido($conexion);

    switch($control) {
        case 'consulta':
            $vec = $detallePedido->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            $params = json_decode($json);
            $vec = $detallePedido->insertar($params);
        break;
        case 'editar':
            $json = file_get_contents('php://input');
            $id = $_GET['id'];
            $params = json_decode($json);
            $vec = $detallePedido->editar($id, $params);
        break;
        case 'eliminar':
            $id = $_GET['id'];
            $vec = $detallePedido->eliminar($id);
        break;
    }

    $datos = json_encode($vec);
    header('Content-Type: application/json');
    echo $datos;

// http://localhost:8080/controlador/detallePedido.php?control=consulta
?>

