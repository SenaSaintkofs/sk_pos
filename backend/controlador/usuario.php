    <?php
    // cargar CORS
    require_once('config/cors.php');

    // cargar modelos
    require_once('../modelo/conexion.php');
    require_once('../modelo/usuario.php');

    $vec = []; // definir vector de respuesta

    global $conexion; // Variable Global a la DB

    $control = $_GET['control']; // tomar dato de control por URL
    $usuario = new Usuario($conexion); // instanciar clase y pasarle la conexion a la DB

    // switch para controlar la acción a realizar según el valor de control
    switch($control) {
        case 'consulta':
            $vec = $usuario->consulta(); // llamar el metodo consulta y guardar el resultado en el vector
        break;
        case 'insertar':
            $json = file_get_contents('php://input'); // obtener datos enviados en formato JSON
            $params = json_decode($json); // decodificar JSON a objeto PHP
            $vec = $usuario->insertar($params); // llamar el metodo insertar y pasarle los parametros decodificados
        break;
        case 'editar':
            $json = file_get_contents('php://input'); // obtener datos enviados en formato JSON
            $id = $_GET['id']; // tomar el id del registro a editar desde la URL
            $params = json_decode($json); // decodificar JSON a objeto PHP
            $vec = $usuario->editar($id, $params); // llamar el metodo editar y pasarle el id y los parametros decodificados
        break;
        case 'eliminar':
            $id = $_GET['id']; // tomar el id del registro a eliminar desde la URL
            $vec = $usuario->eliminar($id); // llamar el metodo eliminar y pasarle el id
        break;
    }

    // convertir vector a JSON y mostrarlo
    $datos = json_encode($vec);
    header('Content-Type: application/json'); // indicar que es json
    echo $datos;

// http://localhost:8080/controlador/usuario.php?control=consulta
?>

