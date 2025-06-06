<?php

require_once  __DIR__ . "/../src/utils/utils.php";
require_once  __DIR__ . "/../src/utils/loadEnv.php";

require_once  __DIR__ . "/../src/model/Report.php";
require_once  __DIR__ . "/../src/model/Setting.php";

require_once  __DIR__ . "/../src/database/Database.php";

require_once  __DIR__ . "/../src/utils/RouteProtecter.php";

require_once  __DIR__ . "/../src/validators/ReportValidator.php";

require_once  __DIR__ . "/../src/controller/AuthController.php";
require_once  __DIR__ . "/../src/controller/ReportController.php";
require_once  __DIR__ . "/../src/controller/SettingController.php";

require_once  __DIR__ . "/../src/router/ReportRouter.php";
require_once  __DIR__ . "/../src/router/AuthRouter.php";
require_once  __DIR__ . "/../src/router/SettingRouter.php";

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
$database = new Database();

$reportValidator = new ReportValidator();

$authController = new AuthController();
$settingController = new SettingController($database);
$reportController = new ReportController($database);

$routeProtecter = new RouteProtecter($authController);

$reportRouter = new ReportRouter($reportController, $routeProtecter, $reportValidator);
$authRouter = new AuthRouter($authController);
$settingRouter = new SettingRouter($settingController, $routeProtecter);

$router -> get("/reports", [$reportRouter, 'getReports']);
$router -> get("/report/:id", [$reportRouter, 'getReport']);
$router -> delete("/report/:id", [$reportRouter, 'deleteReport']);
$router -> post("/report", [$reportRouter, 'postReport']);
$router -> patch("/report/:id", [$reportRouter, 'patchReport']);
$router -> get("/reports/download-csv", [$reportRouter, 'downloadCSV']);

$router -> post("/auth/login", [$authRouter, 'login']);
$router -> post("/auth/logout", [$authRouter, 'logout']);
$router -> get("/auth/logged-in", [$authRouter, 'isLoggedIn']);

$router -> get("/settings", [$settingRouter, 'getSettings']);
$router -> patch("/settings", [$settingRouter, 'patchSettings']);

$router -> dispatch();