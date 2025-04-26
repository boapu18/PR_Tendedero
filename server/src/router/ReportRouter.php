<?php

require_once  __DIR__ . "/../model/Report.php";
require_once  __DIR__ . "/../controller/ReportController.php";

class ReportRouter{

    private $reportController;

    public function __construct(){
        $this -> reportController = new ReportController();
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
    
        try {
    
            $reports = null;
    
            if ($order == "crono"){
                $reports = $this -> reportController -> getReportsInChronologicalOrder((int)$page, (int)$state);
            } else {
                $reports = $this -> reportController -> getReportsInRandomOrder((int)$page);
            }
    
            $totalCount = $this -> reportController -> getReportsCount((int)$state);
            $totalPages = ceil($totalCount / 14);
    
            $data = ["reports" => $reports, "totalCount" => $totalCount, "page" => (int)$page, "totalPages" => $totalPages];
    
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
    
        $report = new Report($content, $province, $canton, $email, $ageBracket);
    
        try {
    
            $result = $this -> reportController -> registerReport($report);
    
            if ($result){
                respondWithSuccess(null, "La denuncia se ha registrado exitosamente", 200);
            } else {
                respondWithError("No se pudo registrar la denuncia, intente nuevamente más tarde", 500);
            }
    
        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function getReport(){

        $uri = $_SERVER['REQUEST_URI'];
        preg_match("/\/report\/(\d+)/", $uri, $matches);
        $id = $matches[1] ?? null;

        if(!$id || !is_numeric($id)){
            respondWithError("ID de reporte no válido", 400);
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
            respondWithError("Se produjo un error inesperado", 500);
        }
    }

    public function patchReport(){}
}