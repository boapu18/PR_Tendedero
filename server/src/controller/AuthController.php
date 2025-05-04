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

    public function downloadCSV() {
        $conn = $this -> database -> connect();
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename="Reportes.csv"');

        $output = fopen('php://output', 'w');

        $result = $conn->query("SELECT * FROM Report");

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            fputcsv($output, array_keys($row));
            fputcsv($output, $row);
            while ($row = $result->fetch_assoc()) {
                fputcsv($output, $row);
            }
        }

        fclose($output);
        $conn->close();
    }
}
