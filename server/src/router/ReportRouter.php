<?php

class ReportRouter{

    private $reportController;
    private $routeProtecter;

    public function __construct($reportController, $routeProtecter){
        $this -> reportController = $reportController;
        $this -> routeProtecter = $routeProtecter;
    }

    public function getReports(){
        
        $page = $_GET["page"] ?? null;
        $order = $_GET["order"] ??  null;
        $state = $_GET["state"] ?? null;
    
        if (is_null($order) || ($order != "crono" && $order != "rand")){
            respondWithError("El orden no es válido", 400);    
        }
    
        if (is_null($page) || !is_numeric($page) || (int)$page <= 0) {
            respondWithError("El número de página no es válido", 400);
        }

        if (!is_null($state) && ((int)$state != 0 && (int)$state != 1 && (int)$state != 2)) {
            respondWithError("El estado no es válido", 400);
        }

        $this -> routeProtecter -> checkGetReportsPermissions((int)$state);
    
        try {
    
            $reports = null;
    
            if ($order == "crono"){
                $reports = $this -> reportController -> getReportsInChronologicalOrder((int)$page, $state);
            } else {
                $reports = $this -> reportController -> getReportsInRandomOrder((int)$page, $state);
            }
    
            $totalCount = $this -> reportController -> getReportsCount($state);
            $totalPages = ceil($totalCount / 14);
            $filteredReports = $this -> routeProtecter -> filterReportInformation($reports);
    
            $data = ["reports" => $filteredReports, "totalCount" => $totalCount, "page" => (int)$page, "totalPages" => $totalPages];
    
            respondWithSuccess($data, "Denuncias obtenidas exitosamente", 200);
    
        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function postReport(){

        $data = json_decode(file_get_contents("php://input"), true);


        $content = $data["description"] ?? null;
        $province = $data["province"] ?? null;
        $canton = $data["canton"] ?? null;
        $email = $data["email"] ?? null;
        $ageBracket = $data["age"] ?? null;
        $genderIdentity = $data["genderIdentity"] ?? null;
        $roleInInstitution = $data["roleInInstitution"] ?? null;
        $reportType = $data["typeReport"] ?? null;
    
        if (!$content || trim($content) === "") {
            respondWithError("La descripción es obligatoria", 400);
        }
    
        $wordCount = str_word_count(strip_tags($content));
        if ($wordCount > 2000) {
            respondWithError("La descripción no puede tener más de 2000 caracteres.", 400);
        }
    
        if ($reportType === "addictional-information") {
    
            if (trim($email) !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                respondWithError("El correo electrónico no es válido", 400);
            }
        }
    
        $report = new Report($content, $province, $canton, $email, $ageBracket, $genderIdentity, $roleInInstitution, null, 0);

        try {
    
            $result = $this -> reportController -> registerReport($report);
    
            if ($result){
                respondWithSuccess(null, "La denuncia se ha registrado exitosamente", 200);
            } else {
                respondWithError("No se pudo registrar la denuncia", 500);
            }
    
        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function getReport($params){

        $this -> routeProtecter -> checkAuth();

        $id = $params['id'];

        if(!$id || !is_numeric($id)){
            respondWithError("Id de reporte no válido", 400);
            return;
        }

        try{

            $report = $this -> reportController -> getReportById((int)$id);

            if($report){
                respondWithSuccess($report, "Denuncia obtenida correctamente", 200);
            } else {
                respondWithError("Denuncia no encontrada", 404);
            }
        } catch (Exception $e) {
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function deleteReport($params){

        $this -> routeProtecter -> checkAuth();

        $id = $params['id'];
    
        if (!$id || !is_numeric($id)) {
            respondWithError("ID de denuncia no válido", 400);
            return;
        }

        try {

            $success = $this -> reportController -> deleteReport((int)$id);
    
            if ($success) {
                respondWithSuccess(null, "La denuncia se ha eliminado exitosamente", 200);
            } else {
                respondWithError("No se pudo eliminar la denuncia", 500);
            }
            
        } catch (Exception $e) {
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function patchReport($params) {

        $this -> routeProtecter -> checkAuth();

        $id = $params['id'];
    
        if (!$id || !is_numeric($id)) {
            respondWithError("ID de denuncia no válido", 400);
            return;
        }
    
        $data = json_decode(file_get_contents("php://input"), true);
        $newState = $data["state"] ?? null;
    
        if (!is_numeric($newState) || !in_array((int)$newState, [0, 1, 2])) {
            respondWithError("Estado no válido", 400);
            return;
        }
    
        try {

            $success = $this -> reportController -> updateReportState((int)$id, (int)$newState);
    
            if ($success) {
                respondWithSuccess(null, "Estado actualizado correctamente", 200);
            } else {
                respondWithError("No se pudo actualizar el estado", 500);
            }
            
        } catch (Exception $e) {
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function downloadCSV() {

        $this -> routeProtecter -> checkAuth();

        try {
            $this -> reportController -> downloadCSV();
        } catch (Exception $e) {
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }
    
}