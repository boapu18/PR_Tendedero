<?php

class AuthRouter {

    private $authController;

    public function __construct($authController){
        $this -> authController = $authController;
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
            respondWithSuccess(["authenticated" => true], "El usuario está autenticado", 200);
        } else {
            respondWithSuccess(["authenticated" => false], "El usuario no está autenticado", 401);
        }
    }

}
