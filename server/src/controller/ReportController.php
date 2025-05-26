<?php

class ReportController {

    private $database;

    public function __construct($database){
        $this -> database = $database;
    }

    /**
     * Obtiene la cantidad total de denuncias registradas con el estado dado.
     * @param int|null $state El estado de los reportes que se quieren contar. Si es null, se cuentan todos.
     * @return int La cantidad total de denuncias registradas con el estado dato.
     */
    public function getReportsCount($state){
        $conn = $this -> database -> connect();

        if (!is_null($state)){
            $query = "SELECT COUNT(*) FROM Report WHERE state = ?;";
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param("i", $state);
        } else {
            $query = "SELECT COUNT(*) FROM Report;";
            $stmt = $conn -> prepare($query);
        }
        
        $stmt -> execute();

        $count = 0;
        $stmt -> bind_result($count);
        $stmt -> fetch();

        $this -> database -> close();
        $stmt -> close();

        return $count;
    }

    /**
     * Obtiene un batch de denuncias ordenadas en orden cronológico.
     * 
     * @param int $page El número de página del batch.
     * @param int|null $state El estado para filtrar las denuncias.
     * @return Report[] Un array de objetos Report, donde cada objeto es un reporte.
     */
    public function getReportsInChronologicalOrder($page, $state){

        $limit = 14;
        $offset = ($page - 1) * $limit;

        $conn = $this -> database -> connect();

        if (is_null($state)){
            $query = "SELECT id, content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate  FROM Report ORDER BY creationDate DESC LIMIT ? OFFSET ?";
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param("ii", $limit, $offset);
        } else {
            $query = "SELECT id, content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate  FROM Report WHERE (state = ?) ORDER BY creationDate DESC LIMIT ? OFFSET ?";
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param("iii", $state, $limit, $offset);
        }
        
        $stmt -> execute();
        $result = $stmt -> get_result();

        $this -> database -> close();
        $stmt -> close();

        if ($result -> num_rows > 0){

            $reports = [];

            while ($row = $result -> fetch_assoc()){
                
                $report = new Report(
                    $row['content'],  
                    $row['province'], 
                    $row['canton'],  
                    $row['email'], 
                    $row['ageBracket'],
                    $row['genderIdentity'],
                    $row['roleInInstitution'],
                    $row['id'], 
                    $row['state'],
                    
                );
                $report -> setCreationDate($row['creationDate']);
                $reports[] = $report;
            }

            return $reports;

        } else {
            return [];
        }
    }

    /**
     * Obtiene un batch de denuncias ordenadas en orden aleatorio, por medio de una semilla.
     * La semilla se genera a partir de la IP del usuario y la fecha y hora actual.
     * 
     * @param int $page El número de página del batch.
     * @param int|null $state El estado para filtrar las denuncias.
     * @return Report[] Un array de objetos Report, donde cada objeto es un reporte.
     */
    public function getReportsInRandomOrder($page, $state) {

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
        
        if (is_null($state)){
            $query = "SELECT id, content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate FROM Report ORDER BY RAND(?) LIMIT ? OFFSET ?";
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param("iii", $seed, $limit, $offset);
        } else {
            $query = "SELECT id, content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate FROM Report WHERE (state = ?) ORDER BY RAND(?) LIMIT ? OFFSET ?";
            $stmt = $conn -> prepare($query);
            $stmt -> bind_param("iiii", $state, $seed, $limit, $offset);
        }
    
        $stmt -> execute();
        $result = $stmt -> get_result();
    
        $this -> database -> close();
        $stmt -> close();
    
        if ($result -> num_rows > 0) {

            $reports = [];

            while ($row = $result -> fetch_assoc()) {
                
                $report = new Report(
                    $row['content'],  
                    $row['province'], 
                    $row['canton'],  
                    $row['email'], 
                    $row['ageBracket'],
                    $row['genderIdentity'],
                    $row['roleInInstitution'],
                    $row['id'], 
                    $row['state'], 
                );
                $report -> setCreationDate($row['creationDate']);
                $reports[] = $report;
            }

            return $reports;

        } else {
            return [];
        }
    }
    
    /**
     * Registra una denuncia en la base de datos. Asume que los datos fueron validados previamente.
     * 
     * @param Report $report Un objeto con el reporte a registrar.
     * @return bool Retorna true si se registró la denuncia, y false en el caso contrario.
     */
    public function registerReport($report){

        $conn = $this -> database -> connect();
        $content = $report -> getContent();
        $province = $report -> getProvince() ?? "";
        $canton =  $report -> getCanton() ?? "";
        $email = $report -> getEmail() ?? "";
        $ageBracket = $report -> getAgeBracket() ?? "";
        $genderIdentity = $report -> getGenderIdentity() ?? "";
        $roleInInstitution = $report -> getRoleInInstitution() ?? "";

        $query = "INSERT INTO Report(content, province, canton, email, ageBracket, genderIdentity, roleInInstitution) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("sssssss", $content, $province, $canton, $email, $ageBracket, $genderIdentity, $roleInInstitution);
        
        $result = $stmt -> execute();

        $this -> database -> close();
        $stmt -> close();

        return $result;
    }

    /**
     * Retorna un reporte por su ID.
     * 
     * @param int $reportId El ID del reporte a obtener.
     * @return Report|null El reporte obtenido, o null si no existe.
     */
    public function getReportById($reportId){
        
        $conn = $this -> database -> connect();

        $query = "SELECT id, content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate FROM Report WHERE id = ?";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("i", $reportId);
        $stmt -> execute();

        $result = $stmt -> get_result();
        $report = null;

        if($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            $report = new Report(
                $row['content'],  
                $row['province'], 
                $row['canton'],  
                $row['email'], 
                $row['ageBracket'],
                $row['genderIdentity'],
                $row['roleInInstitution'],
                $row['id'], 
                $row['state'], 
            );
            $report -> setCreationDate($row['creationDate']);  
        }

        $this -> database -> close();
        $stmt -> close();

        return $report; 
    }


    /**
     * Actualiza el estado de una denuncia.
     * 
     * @param int $reportId El ID del reporte a actualizar el estado.
     * @param int $state El nuevo estado del reporte.
     * @return bool Retorna true si el estado se actualizó correctamente, y false en el caso contrario.
     */
    public function updateReportState($reportId, $state){

        $conn = $this -> database -> connect();

        $query = "UPDATE Report SET state = ? WHERE id = ?";
        $stmt = $conn -> prepare($query);
        $stmt -> bind_param("ii", $state, $reportId);

        $success = $stmt -> execute();

        $stmt -> close();
        $this -> database -> close();

        return $success;
    }

    /**
     * Descarga un archivo CSV con todos los reportes.
     */
    public function downloadCSV() {

        $conn = $this -> database -> connect();
    
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="Reportes.csv"');
    
        $output = fopen('php://output', 'w');
        fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF)); 
    
        $headers = ['Contenido', 'Provincia', 'Cantón', 'Rango de edad', 'Correo electrónico', 'Identidad de Género', 'Rol dentro de la Institución', 'Fecha', 'Estado'];
        fputcsv($output, $headers, ';');
    
        $result = $conn -> query("SELECT content, province, canton, ageBracket, email, state, genderIdentity, roleInInstitution, creationDate FROM Report ORDER BY creationDate DESC");

        $stateMap = [
            0 => 'En espera',
            1 => 'Aceptada',
            2 => 'Archivada'
        ];
    
        if ($result -> num_rows > 0) {

            while ($row = $result -> fetch_assoc()) {
                
                $row['content'] = str_replace(';', ',', $row['content']);
                $stateText = $stateMap[$row['state']];

                $cleanedRow = [
                    $row['content'],
                    $row['province'],
                    $row['canton'],
                    $row['ageBracket'],
                    $row['email'],
                    $row['genderIdentity'], 
                    $row['roleInInstitution'],
                    $row['creationDate'],
                    $stateText
                ];

                fputcsv($output, $cleanedRow, ';');
            }
        }
    
        $conn -> close();
        fclose($output);
        exit;
    }
}
