<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use src\ReportController;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv -> load();

$app = AppFactory::create();

/**
 * Da formato al objeto de respuesta para enviar los datos en JSON junto con el estatus.
 * 
 * @param Response $response El objeto de la respuesta.
 * @param string[] $data Los datos a enviar en formato JSON.
 * @param int $status El estatus de la respuesta.
 * @return Response El objeto de respuesta con los datos en JSON en el cuerpo, los encabezados con el contenido en JSON y el estatus.
 */
function withJson($response, $data, $status){
    $response -> getBody() -> write((string)json_encode($data, JSON_UNESCAPED_UNICODE));
    $response = $response -> withHeader('Content-Type', 'application/json') -> withStatus($status);
    return $response;
}

// Middleware para permitir CORS
$app -> add(function ($request, $handler) {
    $response = $handler -> handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app -> options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// -------------------------------------------------------------------------------------------------------------------------
// Endpoints del API
// -------------------------------------------------------------------------------------------------------------------------

$app -> get('/report', function (Request $request, Response $response, $args) {

    $params = $request -> getQueryParams();
    $order = $params['order'] ?? null;
    $page = $params['page'] ?? null;

    if (is_null($order) || ($order != 'crono' && $order != 'rand')){
        return withJson($response, ['status' => 'error', 'message' => 'El orden no es válido'], 400);    
    }

    if (is_null($page) || !is_numeric($page) || (int)$page <= 0) {
        return withJson($response, ['status' => 'error', 'message' => 'El número de página no es válido'], 400);
    }

    try {

        $reportController = new ReportController();

        $reports = null;

        if ($order == 'crono'){
            $reports = $reportController -> getReportsInChronologicalOrder((int)$page);
        } else {
            $reports = [];
        }

        return withJson($response, ['status' => 'success', 'data' => $reports], 200);


    } catch (Exception $e){
        // TODO: Poner el mensaje del error en un log
        return withJson($response, ['status' => 'error', 'message' => 'Se produjo un error inesperado, intente nuevamente más tarde'], 500);
    }
});

$app->post('/report', function (Request $request, Response $response, $args) {
    $body = json_decode($request->getBody(), true);

    try {
        $reportController = new ReportController();
        $result = $reportController->submitReport($body);
        return withJson($response, ['status' => 'success', 'message' => $result], 200);
    } catch (Exception $e) {
        return withJson($response, ['status' => 'error', 'message' => $e->getMessage()], 400);
    }
});

$app -> run();