<?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/subcategoria.php');

    $vec = [];

    global $conexion;

    $control = $_GET['control'];
    $subcategoria = new Subcategoria($conexion);

    switch($control) {
        case 'consulta':
            $vec = $subcategoria->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            $params = json_decode($json);
            $vec = $subcategoria->insertar($params);
        break;
        case 'editar':
            $json = file_get_contents('php://input');
            $id = $_GET['id'];
            $params = json_decode($json);
            $vec = $subcategoria->editar($id, $params);
        break;
        case 'eliminar':
            $id = $_GET['id'];
            $vec = $subcategoria->eliminar($id);
        break;
    }

    $datos = json_encode($vec);
    header('Content-Type: application/json');
    echo $datos;

// http://localhost:8080/controlador/subcategoria.php?control=consulta
?>

