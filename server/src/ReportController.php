<?php

include "Database.php";

class ReportController {

    private $database;

    public function __construct(){
        $this -> database = new Database();
    }

    /**
     * Obtiene un batch de denuncias ordenadas en orden cronológico. No filtra por estado. Las
     * denuncias incluyen el contenido e información adicional.
     * 
     * @param int $page El número de página del batch.
     * @return array[] Un array de documentos, donde cada documento es una denuncia.
     */
    public function getReportsInChronologicalOrder($page){

        $limit = 14;
        $offset = ($page - 1) * $limit;

        $conn = $this -> database -> connect();

        $query = "SELECT content FROM Report ORDER BY creationDate DESC LIMIT ? OFFSET ? ";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("ii", $limit, $offset);
        
        $stmt -> execute();
        $result = $stmt -> get_result();

        $this -> database -> close();
        $stmt -> close();

        if ($result -> num_rows > 0){

            $reports = [];

            while ($row = $result -> fetch_assoc()){
                $reports[] = $row;
            }

            return $reports;

        } else {
            return [];
        }
    }

    /**
     * Obtiene un batch de denuncias ordenadas en orden aleatorio, por medio de una semilla.
     * La semilla se genera a partir de la IP del usuario y la fecha y hora actual.
     * No filtra por estado. Las denuncias solo incluyen el contenido.
     * 
     * @param int $page El número de página del batch.
     * @return array[] Un array de documentos, donde cada documento es una denuncia.
     */
    public function getReportsInRandomOrder($page) {
        $limit = 14;
        $offset = ($page - 1) * $limit;
    
        $conn = $this -> database -> connect();
    
        $ip = $_SERVER['REMOTE_ADDR'];
        $minuteGroup = floor(date("i") / 10); 
        $hour = date("H");
        $day = date("j");
        $month = date("n");
    
        $ip = str_replace(".", "", $ip);
        $seed = ($ip + $minuteGroup + $hour + $day + $month); 
    
        $query = "SELECT content FROM Report ORDER BY RAND(?) LIMIT ? OFFSET ?";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("iii", $seed, $limit, $offset);
    
        $stmt -> execute();
        $result = $stmt -> get_result();
    
        $this -> database -> close();
        $stmt -> close();
    
        if ($result -> num_rows > 0) {
            $reports = [];
            while ($row = $result -> fetch_assoc()) {
                $reports[] = $row;
            }
            return $reports;
        } else {
            return [];
        }
    }
    
    /**
     * Registra una denuncia en la base de datos. Asume que los datos fueron validados previamente.
     * 
     * @param string $content El contenido de la denuncia.
     * @param string $province La provincia, puede venir en null si el usuario no la coloco.
     * @param string $canton EL cantón, puede venir en null si el usuario no lo coloco.
     * @param string $email El correo, puede venir en null si el usuario no lo coloco.
     * @param string $ageBracket, puede venir en null si el usuario no lo coloco.
     * @return boll Retorna true si se registró la denuncia, y false en el caso contrario.
     */
    public function registerReport($content, $province, $canton, $email, $ageBracket){

        $conn = $this -> database -> connect();

        $query = "INSERT INTO Report(content, province, canton, email, ageBracket) VALUES(?, ?, ?, ?, ?)";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("sssss", $content, $province, $canton, $email, $ageBracket);
        
        $result = $stmt -> execute();

        $this -> database -> close();
        $stmt -> close();

        return $result;
    }
}