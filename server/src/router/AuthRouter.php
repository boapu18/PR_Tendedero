<?php

class AuthRouter {

    private $authController;

    public function __construct($authController){
        $this -> authController = $authController;
    }
    
    /**
     * Inicia sesión en el sistema tomando como entrada las credenciales introducidas por el usuario.
     */
    public function login() {

        $data = json_decode(file_get_contents("php://input"), true);

        // Se obtienen y sanitizan los datos
        $username = sanitizeText($data['username'] ?? null);
        $password = sanitizeText($data['password'] ?? null);

        // Se verifica si las credenciales son correctas
        if ($this -> authController -> login($username, $password)) {
            respondWithSuccess(null, "Autenticación exitosa", 200);
        } else {
            respondWithError("Usuario y/o contraseña incorrectos", 401);
        }
    }

    /**
     * Cierra la sesión del usuario en el sistema.
     */
    public function logout() {
        $this -> authController -> logout();
        respondWithSuccess(null, "Cierre de sesión exitoso", 200);
    }

    /**
     * Verifica si el usuario está autenticado en el sistema.
     */
    public function isLoggedIn() {

        if ($this -> authController -> isLoggedIn()) {
            respondWithSuccess(["authenticated" => true], "El usuario está autenticado", 200);
        } else {
            respondWithSuccess(["authenticated" => false], "El usuario no está autenticado", 401);
        }
    }

}
