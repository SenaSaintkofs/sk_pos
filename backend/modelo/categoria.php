<?php
    class Categoria{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consultar() {
            $sql = "SELECT * FROM CATEGORIA WHERE activo = TRUE ORDER BY nombre";
            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $vec = [];
            $sql = "UPDATE CATEGORIA SET activo = FALSE WHERE id_categoria = $id";

            if (mysqli_query($this->conexion, $sql)) {
                $vec['resultado'] = "OK";
                $vec['mensaje'] = "Se desactivo el registro";
            } else {
                $vec['resultado'] = "ERROR";
                $vec['mensaje'] = "No se pudo actualizar el registro";
            }
            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO CATEGORIA(nombre) VALUES('$params->nombre')";
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "OK";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE CATEGORIA SET nombre = '$params->nombre' WHERE id_categoria = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "OK";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>