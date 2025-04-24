<?php

session_start();

class AuthController {
    
    private $username;
    private $password;

    public function __construct() {
        $this -> username = getenv('APP_ADMIN_USERNAME');
        $this -> password = getenv('APP_ADMIN_PASSWORD');
    }
    
    public function login($username, $password) {
        
        if ($username === $this -> username && $password === $this -> password) {
            $_SESSION['logged_in'] = true;
            session_regenerate_id(true);
            return true;
        }
        
        return false;
    }

    public function isLoggedIn() {
        return !empty($_SESSION['logged_in']);
    }

    public function logout() {
        session_unset();
        session_destroy();
    }
}
