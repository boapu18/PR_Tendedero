<?php

class ReportValidator {

    public function validateId($reportId){
        
        if(is_null($reportId) || !is_numeric($reportId)){
            respondWithError("El identificador no es válido", 400);
        }
    }

    public function validateReportType($reportType){

        if (is_null($reportType) || $reportType === ""){
            respondWithError("El tipo de reporte es obligatorio", 400);
        }

        if ($reportType !== "anonymous" && $reportType !== "additional-information"){
            respondWithError("El tipo de reporte no es válido", 400);
        }
    }

    public function validateContent($content){
        
        if (is_null($content) || $content === "") {
            respondWithError("La descripción es obligatoria", 400);
        }

        if (strlen($content) > 2000){
            respondWithError("La descripción no puede tener más de 2000 caracteres.", 400);
        }
    }

    public function validateRoleInInstitution($roleInInstitution){

        if (is_null($roleInInstitution) || $roleInInstitution === "") {
            respondWithError("El rol en la institución es obligatorio", 400);
        }
    }

    public function validateEmail($email){

        if (is_null($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
            respondWithError("El correo electrónico no es válido", 400);
        }
    }

    public function validateProvince($province){}

    public function validateCanton($canton){}

    public function validateAgeBracket($ageBracket){}

    public function validateGenderIdentity($genderIdentity){}

    public function validateState($state){

        if (is_null($state) || !is_numeric($state) || !in_array((int)$state, [0, 1, 2])) {
            respondWithError("Estado no válido", 400);
        }
    }
}