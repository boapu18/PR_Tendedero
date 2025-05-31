<?php

class ReportRouter{

    private $reportController;
    private $routeProtecter;
    private $reportValidator;

    public function __construct($reportController, $routeProtecter, $reportValidator){
        $this -> reportController = $reportController;
        $this -> routeProtecter = $routeProtecter;
        $this -> reportValidator = $reportValidator;
    }

    /**
     * Obtiene un batch de denuncias
     */
    public function getReports(){
        
        $page = sanitizeText($_GET["page"] ?? null);
        $order = sanitizeText($_GET["order"] ??  null);
        $state = sanitizeText($_GET["state"] ?? null);
    
        if (is_null($order) || ($order != "crono" && $order != "rand")){
            respondWithError("El orden no es válido", 400);    
        }
    
        if (is_null($page) || !is_numeric($page) || (int)$page <= 0) {
            respondWithError("El número de página no es válido", 400);
        }

        if (!is_null($state) && ((int)$state != 0 && (int)$state != 1 && (int)$state != 2)) {
            respondWithError("El estado no es válido", 400);
        }

        // Verificamos los permisos del usuario para consultar las denuncias
        // según el estado que se pide
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

            // Filtramos datos sensibles de los reportes para
            // usuarios no autenticados
            $filteredReports = $this -> routeProtecter -> filterReportInformation($reports);
    
            $data = ["reports" => $filteredReports, "totalCount" => $totalCount, "page" => (int)$page, "totalPages" => $totalPages];
    
            respondWithSuccess($data, "Denuncias obtenidas exitosamente", 200);
    
        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    /**
     * Registra una denuncia
     */
    public function postReport(){

        $data = json_decode(file_get_contents("php://input"), true);

        // Obtenemos los datos y los sanitizamos
        $content = sanitizeText($data["description"] ?? null);
        $province = sanitizeText($data["province"] ?? null);
        $canton = sanitizeText($data["canton"] ?? null);
        $email = sanitizeText($data["email"] ?? null);
        $ageBracket = sanitizeText($data["age"] ?? null);
        $genderIdentity = sanitizeText($data["genderIdentity"] ?? null);
        $roleInInstitution = sanitizeText($data["roleInInstitution"] ?? null);
        $reportType = sanitizeText($data["typeReport"] ?? null);
        
        // Validamos formato y campos obligatorios
        $this -> reportValidator -> validateContent($content);
        $this -> reportValidator -> validateReportType($reportType);
    
        if ($reportType === "additional-information") {
            $this -> reportValidator -> validateEmail($email);
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

    /**
     * Obtiene una denuncia por su identificador
     */
    public function getReport($params){

        // Verificamos que el usuario cuente con autenticación
        $this -> routeProtecter -> checkAuth();

        $id = sanitizeText($params['id']);
        $this -> reportValidator -> validateId($id);

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

    /**
     * Elimina una denuncia por su identificador
     */
    public function deleteReport($params){

        // Verificamos que el usuario cuente con autenticación
        $this -> routeProtecter -> checkAuth();

        $id = sanitizeText($params['id']);
        $this -> reportValidator -> validateId($id);

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

    /**
     * Actualiza el estado de una denuncia
     */
    public function patchReport($params) {

        // Verificamos que el usuario cuente con autenticación
        $this -> routeProtecter -> checkAuth();

        $id = sanitizeText($params['id']);
        $this -> reportValidator -> validateId($id);
    
        $data = json_decode(file_get_contents("php://input"), true);

        $newState = sanitizeText($data["state"] ?? null );
        $this -> reportValidator -> validateState($newState);
    
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

    /**
     * Descarga un archivo con todas las denuncias registradas
     */
    public function downloadCSV() {

        // Verificamos que el usuario cuente con autenticación
        $this -> routeProtecter -> checkAuth();

        try {
            $this -> reportController -> downloadCSV();
        } catch (Exception $e) {
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }
    
}