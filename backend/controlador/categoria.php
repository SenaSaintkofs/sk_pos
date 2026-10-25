<?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/categoria.php');

    global $conexion;
    $control = $_GET['control'];
    $categoria = new Categoria($conexion);

    switch($control) {
        case 'consultar':
            $vec = $categoria->consultar();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            $params = json_decode($json);
            $vec = $categoria->insertar($params);
        break;
        case 'editar':
            $json = file_get_contents('php://input');
            $id = $_GET['id'];
            $params = json_decode($json);
            $vec = $categoria->editar($id, $params);
        break;
        case 'eliminar':
            $id = $_GET['id'];
            $vec = $categoria->eliminar($id);
        break;
    }

    $datos = json_encode($vec);
    header('Content-Type: application/json');
    echo $datos;

// http://localhost:8080/controlador/categoria.php?control=consultar
?>

