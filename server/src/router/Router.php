<?php

class Router {
    
    private $routes = [];

    /**
     * Asocia un endpoint para el método GET a una función.
     */
    public function get($path, $handler) {
        $this -> addRoute('GET', $path, $handler);
    }

    /**
     * Asocia un endpoint para el método POST a una función.
     */
    public function post($path, $handler) {
        $this -> addRoute('POST', $path, $handler);
    }

    /**
     * Asocia un endpoint para el método PATCH a una función.
     */
    public function patch($path, $handler) {
        $this -> addRoute('PATCH', $path, $handler);
    }

    /**
     * Asocia un endpoint para el método DELETE a una función.
     */
    public function delete($path, $handler) {
        $this -> addRoute('DELETE', $path, $handler);
    }

    private function addRoute($method, $path, $handler) {

        $regex = preg_replace('#:([\w]+)#', '([^/]+)', $path);
        $regex = "#^" . $regex . "$#";

        $this -> routes[$method][] = [
            'pattern' => $regex,
            'params' => $this -> extractParamNames($path),
            'handler' => $handler
        ];
    }

    private function extractParamNames($path) {
        preg_match_all('#:([\w]+)#', $path, $matches);
        return $matches[1];
    }

    /**
     * Obtiene la solicitud entrante y llama la función correspondiente
     * al endpoint solicitado. Si no hay una función asociada al
     * endpoint solicitado, devuelve un 404: Ruta no encontrada.
     */
    public function dispatch() {

        $requestUri = $_SERVER["REQUEST_URI"];
        
        if (strpos($requestUri, "/backend") === 0){
            $requestUri = substr($requestUri, 25);
        }

        $uri = parse_url($requestUri, PHP_URL_PATH);
        
        $method = $_SERVER['REQUEST_METHOD'];
        
        if (!isset($this -> routes[$method])) {
            respondWithError("Método no permitido", 405);
            return;
        }

        foreach ($this -> routes[$method] as $route) {

            if (preg_match($route['pattern'], $uri, $matches)) {
                array_shift($matches);
                $params = array_combine($route['params'], $matches);
                call_user_func($route['handler'], $params);
                return;
            }
        }

        respondWithError("Ruta no encontrada", 404);
    }
}
