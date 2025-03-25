<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
use src\ReportController;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv -> load();

$app = AppFactory::create();

function withJson($response, $data, $status){
    $response->getBody()->write((string)json_encode($data, JSON_UNESCAPED_UNICODE));
    $response = $response->withHeader('Content-Type', 'application/json')->withStatus($status);
    return $response;
}

$app -> get('/reports', function (Request $request, Response $response, $args) {

    $params = $request -> getQueryParams();
    $order = $params['order'];
    $page = $params['page'];

    if ($order != 'crono' && $order != 'rand'){
        return withJson($response, ['status' => 'error', 'message' => 'El orden no es válido'], 400);    
    }

    if (!is_numeric($page) || (int)$page <= 0) {
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

$app -> run();