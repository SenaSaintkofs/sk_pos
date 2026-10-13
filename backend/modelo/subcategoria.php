<?php
    class Subcategoria{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT SC.*, C.nombre AS categoria FROM SUBCATEGORIA SC 
                    INNER JOIN CATEGORIA C ON SC.id_categoria = C.id_categoria 
                    ORDER BY SC.nombre";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function consulta2($id_categoria) {
            $sql = "SELECT SC.*, C.nombre AS categoria FROM SUBCATEGORIA SC 
                    INNER JOIN CATEGORIA C ON SC.id_categoria = C.id_categoria 
                    WHERE SC.id_categoria = $id_categoria ORDER BY SC.nombre";

            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];

            while($row = mysqli_fetch_array($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM SUBCATEGORIA WHERE id_subcategoria = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO SUBCATEGORIA(id_categoria, nombre) VALUES($params->id_categoria, '$params->nombre')"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE SUBCATEGORIA SET id_categoria = $params->id_categoria, nombre = '$params->nombre' WHERE id_subcategoria = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>