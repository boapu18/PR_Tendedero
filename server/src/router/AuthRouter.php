<?php

require_once  __DIR__ . "/../controller/AuthController.php";

class AuthRouter {

    private $authController;

    public function __construct(){
        $this -> authController = new AuthController();
    }
    
    public function login() {

        $data = json_decode(file_get_contents("php://input"), true);

        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if ($this -> authController -> login($username, $password)) {
            respondWithSuccess(null, "Autenticación exitosa", 200);
        } else {
            respondWithError("Usuario y/o contraseña incorrectos", 401);
        }
    }

    public function logout() {
        $this -> authController -> logout();
        respondWithSuccess(null, "Cierre de sesión exitoso", 200);
    }

    public function isLoggedIn() {

        if ($this -> authController -> isLoggedIn()) {
            respondWithSuccess(["authenticated" => true], "Cierre de sesión exitoso", 200);
        } else {
            respondWithSuccess(["authenticated" => false], "Cierre de sesión exitoso", 401);
        }
    }

    public function downloadCSV() {
        $this -> authController -> downloadCSV();
        if ($this -> authController -> downloadCSV()) {
            respondWithSuccess(["authenticated" => true], "Descargando CSV...", 200);
        } else {
            respondWithError(["authenticated" => false], "No se pudo descargar el archivo", 401);
        }
    }
}
