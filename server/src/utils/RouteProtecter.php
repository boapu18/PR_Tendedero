<?php

class RouteProtecter {

    private $authController;

    public function __construct($authController){
        $this -> authController = $authController;
    }

    /**
     * Esta función sirve para proteger rutas que requieran autenticación.
     * La función verifica si el usuario está autenticado. Si no lo está,
     * devuelve una respuesta con error de autenticación.
     */
    public function checkAuth(){
        
        if (!$this -> authController -> isLoggedIn()) {
            respondWithError("Usuario no autenticado", 401);
        }
    }

    /**
     * Esta función sirve para verificar si un usuario cuenta con los
     * permisos para ver las denuncias.
     * Si el usuario no está autenticado y quiere ver denuncias
     * con un estado diferente a las aceptadas, devuelve una respuesta con error de autenticación.
     * 
     * @param int|null $state El estado que solicita el usuario para ver.
     */
    public function checkGetReportsPermissions($state){

        if ($this -> authController -> isLoggedIn()){
            return;
        }

        if ($state !== 1){
            respondWithError("Usuario no autenticado", 401);
        }
    }

    /**
     * Esta función sirve para filtrar el contenido de las denuncias que
     * ven los usuarios.
     * Los usuarios no autenticados solo pueden ver denuncias con estado
     * de aceptadas, y solo pueden ver el ID, contenido y estado de la denuncia.
     * 
     * @param Report[] $reports El array de denuncias a filtrar.
     * @return Report[] Un array de objetos Report, donde cada objeto es un reporte con el contenido filtrado.
     */
    public function filterReportInformation($reports){

        if (!$this -> authController -> isLoggedIn()){
            
            $filteredReports = array_filter($reports, function($report) {
                return $report -> getState() === 1;
            });
    
            foreach ($filteredReports as $report) {
                $report -> setProvince(null);
                $report -> setCanton(null);
                $report -> setEmail(null);
                $report -> setAgeBracket(null);
            }
    
            return array_values($filteredReports);
        }

        return $reports;
    }
}