<?php

class AuthController {
    
    private $username;
    private $password;

    public function __construct() {

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $this -> username = getenv('APP_ADMIN_USERNAME');
        $this -> password = getenv('APP_ADMIN_PASSWORD');
    }
    
    /**
     * Inicia sesión con el usuario y contraseña proporcionados.
     * 
     * @param string $username El nombre de usuario.
     * @param string $password La contraseña.
     * @return bool Retorna true si el usuario y contraseña son correctos, y false en el caso contrario.
     */
    public function login($username, $password) {
        
        if ($username === $this -> username && $password === $this -> password) {
            $_SESSION['logged_in'] = true;
            session_regenerate_id(true);
            return true;
        }
        
        return false;
    }

    /**
     * Verifica si el usuario está autenticado.
     * 
     * @return bool Retorna true si el usuario está autenticado, y false en el caso contrario.
     */
    public function isLoggedIn() {
        return !empty($_SESSION['logged_in']);
    }

    /**
     * Cierra la sesión del usuario.
     */
    public function logout() {
        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        session_destroy();
    }
    
}
