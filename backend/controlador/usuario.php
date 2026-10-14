<?php
    // Lineas importantes para permiso CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin; X-Requested-With, Content-Type, Accept');

    require_once('../modelo/conexion.php');
    require_once('../modelo/usuario.php');

    $control = $_GET['control'];
    $usuario = new Usuario($conexion);

    switch($control) {
        case 'consulta':
            $vec = $usuario->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php//input');
            $params = json_decode($json);
            $vec = $usuario->insertar($params);
        break;
        case 'editar':
            $json = file_get_contents('php//input');
            $id = $_GET['id'];
            $params = json_decode($json);
            $vec = $usuario->editar($id, $params);
        break;
        case 'eliminar':
            $id = $_GET['id'];
            $vec = $usuario->eliminar($id);
    }

    $datos = json_encode($vec);
    echo $datos;
    header('Content-Type: application/json');

// http://localhost:8080/controlador/usuario.php?control=consulta
?>

