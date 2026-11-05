<?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/venta.php');

    $vec = []; // definir vector de respuesta

    global $conexion; // Variable Global a la DB

    $control = $_GET['control']; // tomar dato de control por URL
    $venta = new Venta($conexion); // instanciar clase y pasarle la conexion a la DB

    // switch para controlar la acción a realizar según el valor de control
    switch($control) {
        case 'consulta':
            $vec = $venta->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input'); // obtener datos enviados en formato JSON
            $params = json_decode($json); // decodificar JSON a objeto PHP
            $vec = $venta->insertar($params); // llamar el metodo insertar y pasarle los parametros decodificados
        break;
        case 'editar':
            $json = file_get_contents('php://input'); // obtener datos enviados en formato JSON
            $id = $_GET['id']; //| tomar el id del registro a editar desde la URL
            $params = json_decode($json); // decodificar JSON a objeto PHP
            $vec = $venta->editar($id, $params); // llamar el metodo editar y pasarle el id y los parametros decodificados
        break;
        case 'eliminar':
            $id = $_GET['id'];//| tomar el id del registro a editar desde la URL
            $vec = $venta->eliminar($id); // llamar el metodo eliminar y pasarle los parametros decodificados
        break;
    }

    $datos = json_encode($vec);
    header('Content-Type: application/json');
    echo $datos;

// http://localhost:8080/controlador/venta.php?control=consulta
?>

