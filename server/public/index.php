<?php

require_once  __DIR__ . "/../src/utils.php";
require_once  __DIR__ . "/../src/loadEnv.php";
require_once  __DIR__ . "/../src/router/ReportRouter.php";
require_once  __DIR__ . "/../src/router/AuthRouter.php";
require_once  __DIR__ . "/../src/router/Router.php";

// -------------------------------------------------------------------------------------------------------------------------
// Configuraciones de CORS para desarrollo, en producción no son necesarias
// -------------------------------------------------------------------------------------------------------------------------

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$is_dev = strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false;

if ($is_dev) {

    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER["REQUEST_METHOD"] == "OPTIONS"){
        exit(0);
    }
}

// -------------------------------------------------------------------------------------------------------------------------
// Endpoints del API
// -------------------------------------------------------------------------------------------------------------------------

$router = new Router();
$reportRouter = new ReportRouter();
$authRouter = new AuthRouter();

$router -> get("/report", [$reportRouter, 'getReports']);
$router -> get("/report/:id", [$reportRouter, 'getReport']);
$router -> post("/report", [$reportRouter, 'postReport']);
$router -> patch("/report/:id", [$reportRouter, 'patchReport']);

$router -> post("/auth/login", [$authRouter, 'login']);
$router -> post("/auth/logout", [$authRouter, 'logout']);
$router -> get("/auth/logged-in", [$authRouter, 'isLoggedIn']);
$router -> get("/auth/download-csv", [$authRouter, 'downloadCSV']);

$router -> dispatch();