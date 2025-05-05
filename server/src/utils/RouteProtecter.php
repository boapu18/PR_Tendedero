<?php

class RouteProtecter {

    private $authController;

    public function __construct($authController){
        $this -> authController = $authController;
    }

    public function checkAuth(){
        
        if (!$this -> authController -> isLoggedIn()) {
            respondWithError("Usuario no autenticado", 401);
        }
    }

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