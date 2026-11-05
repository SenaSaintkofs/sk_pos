<?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/categoria.php');
    
    $vec = []; // definir vector de respuesta

    global $conexion; // Variable Global a la DB
    $control = $_GET['control']; // tomar dato de control por URL
    $categoria = new Categoria($conexion); // instanciar clase y pasarle la conexion a la DB

    // switch para controlar la acción a realizar según el valor de control
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
    // convertir vector a JSON y mostrarlo
    $datos = json_encode($vec);
    header('Content-Type: application/json'); // indicar que es json
    echo $datos;

// http://localhost:8080/controlador/categoria.php?control=consultar
?>

