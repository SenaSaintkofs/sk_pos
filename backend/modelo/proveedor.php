<?php
    class Proveedor{
        // Atrbutos
        private $conexion;

        public function __construct($conexion)
        {
            $this->conexion =$conexion;
            //throw new \Exception('Not implemented');
        }

        public function consulta() {
            $sql = "SELECT * FROM PROVEEDOR ORDER BY nombre";
            $res = mysqli_query($this->conexion, $sql) or die("No se ha encontrado categoria");

            $vec = [];
            // Evitar arreglos
            while($row = mysqli_fetch_assoc($res)){
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $sql = "DELETE FROM PROVEEDOR WHERE id_proveedor = $id";
            mysqli_query($this->conexion, $sql) or die("No se elimino el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se elimino el registro";

            return $vec;
        }

        public function insertar($params) {
            $sql = "INSERT INTO PROVEEDOR(nit, nombre, telefono) VALUES('$params->nit', '$params->nombre', '$params->telefono')"; // comilla solo con txt
            mysqli_query($this->conexion, $sql) or die("No se inserto el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha insertado el registro";

            return $vec;
        }

        public function editar($id, $params) {
            $sql = "UPDATE PROVEEDOR SET nit = '$params->nit', nombre = '$params->nombre', telefono = '$params->telefono' WHERE id_proveedor = $id";
            mysqli_query($this->conexion, $sql) or die("No se edito el registro");

            $vec = [];
            $vec['resultado'] = "ok";
            $vec['mensaje'] = "Se ha editado el registro";

            return $vec;
        }
    }
?>