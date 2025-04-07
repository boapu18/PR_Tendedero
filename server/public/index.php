<?php

include "../src/loadEnv.php";
include "../src/Report.php";
include "../src/ReportController.php";

// -------------------------------------------------------------------------------------------------------------------------
// Configuraciones de CORS
// -------------------------------------------------------------------------------------------------------------------------

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS"){
    exit(0);
}

// -------------------------------------------------------------------------------------------------------------------------
// Entrada del servidor
// -------------------------------------------------------------------------------------------------------------------------

$requestUri = $_SERVER["REQUEST_URI"];

if (strpos($requestUri, "/backend") === 0){
    $requestUri = substr($requestUri, 25);
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($requestUri, PHP_URL_PATH);

if ($uri == "/report"){

    switch($requestMethod){
        case "GET":
            getReport();
            break;
        case "POST":
            postReport();
            break;
        default:
            respondWithError("Método no permitido", 405);
            break;
    }

} else {
    respondWithError("Ruta no encontrada", 404);
}

// -------------------------------------------------------------------------------------------------------------------------
// Funciones de manejo de respuestas
// -------------------------------------------------------------------------------------------------------------------------

function respondWithError($message, $statusCode){
    header("Content-Type: application/json");
    http_response_code($statusCode);
    echo json_encode(["status" => "error", "message" => $message]);
    exit;
}

function respondWithSuccess($data, $message, $statusCode){
    header("Content-Type: application/json");
    http_response_code($statusCode);
    echo json_encode(["status" => "success", "message" => $message, "data" => $data]);
    exit;
}

// -------------------------------------------------------------------------------------------------------------------------
// Endpoints del API
// -------------------------------------------------------------------------------------------------------------------------

function getReport(){

    $page = isset($_GET["page"]) ? $_GET["page"] : null;
    $order = isset($_GET["order"]) ? $_GET["order"] : null;
    $id = isset($_GET["id"]) ? $_GET["id"] : null;

    if (is_null($id)){
        getReportBatch($page, $order);
    }
}

function getReportBatch($page, $order){

    if (is_null($order) || ($order != "crono" && $order != "rand")){
        respondWithError("El orden no es válido", 400);    
    }

    if (is_null($page) || !is_numeric($page) || (int)$page <= 0) {
        respondWithError("El número de página no es válido", 400);
    }

    try {

        $reportController = new ReportController();

        $reports = null;

        if ($order == "crono"){
            $reports = $reportController -> getReportsInChronologicalOrder((int)$page);
        } else {
            $reports = $reportController -> getReportsInRandomOrder((int)$page);;
        }

        respondWithSuccess($reports, "Denuncias obtenidas exitosamente", 200);

    } catch (Exception $e){
        error_log($e -> getMessage());
        respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
    }
}

function postReport(){

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

        $reportController = new ReportController();

        $result = $reportController -> registerReport($report);

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