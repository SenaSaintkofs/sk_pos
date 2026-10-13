<?php
    class Usuario{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT id_usuario, correo, clave, CONCAT_WS(' ', primer_nombre, segundo_nombre, primer_apellido, segundo_apellido) AS usuario, numero_documento, telefono FROM USUARIO ORDER BY usuario";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        /*public function eliminar($id) {
            $sql = "DELETE FROM USUARIO VENTA WHERE id_usuario = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }*/

        public function insertar($params) {
            $sql = "INSERT INTO USUARIO(correo, clave, rol, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, numero_documento, telefono) VALUES(correo = '$params->correo', clave = '$params->clave', rol = '$params->rol', primer_nombre = '$params->primer_nombre', segundo_nombre = '$params->segundo_nombre', primer_apellido = '$params->primer_apellido', segundo_apellido = '$params->segundo_apellido', numero_documento = $params->numero_documento, telefono = '$params->telefono')"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE USUARIO SET correo = '$params->correo', clave = '$params->clave', rol = '$params->rol', primer_nombre = '$params->primer_nombre', segundo_nombre = '$params->segundo_nombre', primer_apellido = '$params->primer_apellido', segundo_apellido = '$params->segundo_apellido', numero_documento = $params->numero_documento, telefono = '$params->telefono' WHERE id_usuario = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>