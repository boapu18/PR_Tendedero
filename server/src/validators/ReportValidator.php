<?php

class ReportValidator {

    /**
     * Valida el identificador de una denuncia.
     * Un identificador válido es no nulo y es un número entero
     */
    public function validateId($reportId){
        
        if(is_null($reportId) || !filter_var($reportId, FILTER_VALIDATE_INT) || (int)$reportId < 0){
            respondWithError("El identificador no es válido", 400);
        }
    }

    /**
     * Valida el tipo de reporte de una denuncia.
     * El tipo de reporte válido es no nulo.
     */
    public function validateReportType($reportType){

        if (is_null($reportType) || $reportType === ""){
            respondWithError("El tipo de reporte es obligatorio", 400);
        }

        if ($reportType !== "anonymous" && $reportType !== "additional-information"){
            respondWithError("El tipo de reporte no es válido", 400);
        }
    }

    /**
     * Valida el contenido de una denuncia.
     * El contenido válido es no nulo.
     */
    public function validateContent($content){
        
        if (is_null($content) || $content === "") {
            respondWithError("La descripción es obligatoria", 400);
        }

        if (strlen($content) > 2000){
            respondWithError("La descripción no puede tener más de 2000 caracteres.", 400);
        }
    }

    /**
     * Valida el rol dentro de la institución de una denuncia.
     * El rol dentro de la institución válido es no nulo.
     */
    public function validateRoleInInstitution($roleInInstitution){

        if (is_null($roleInInstitution) || $roleInInstitution === "" || !in_array($roleInInstitution, ["Persona estudiante", "Persona docente", "Persona administrativa", "Otro"], true)) {
            respondWithError("El rol en la institución es obligatorio", 400);
        }
    }

    /**
     * Valida el correo electrónico de una denuncia.
     * El correo electrónico se valida si es no nulo o no vacío.
     */
    public function validateEmail($email){

        if (!is_null($email) && !empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)){
            respondWithError("El correo electrónico no es válido", 400);
        }
    }

    /**
     * Valida la provincia de una denuncia.
     * La provincia se valida si es no nula o no vacía.
     */
    public function validateProvince($province){

        if (!is_null($province) && !empty($province) && !in_array($province, ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"], true)){
            respondWithError("Provincia no válida", 400);
        }
    }

    /**
     * Valida el cantón de una denuncia.
     * El cantón se valida si es no nulo o no vacío.
     */
    public function validateCanton($canton){

        if (!is_null($canton) && !empty($canton) && !in_array($canton, ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", 
                                                     "Goicochea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", 
                                                     "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", 
                                                     "León Córtes Castro", "Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", 
                                                     "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto",
                                                     "Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco",
                                                     "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", 
                                                     "Flores", "San Pablo", "Sarapiquí", "Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", 
                                                     "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha", "Puntarenas", "Esparza", 
                                                     "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", 
                                                     "Parrita", "Corredoes", "Garabito", "Monteverde", "Puerto Jiménez", "Limón", 
                                                     "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"], true)){
            respondWithError("Cantón no válido", 400);
        }
    }

    /**
     * Valida el rango de edad de una denuncia.
     * El rango de edad se valida si es no nulo o no vacío.
     */
    public function validateAgeBracket($ageBracket){

        if (!is_null($ageBracket) && !empty($ageBracket) && !in_array($ageBracket, ["Menos de 18 años", "18-24 años", "25-34 años", "45-54 años", "55-64 años", "65 años o más"], true)){
            respondWithError("Rango de edad no válido", 400);
        }
    }

    /**
     * Valida la identidad de género de una denuncia.
     * La identidad de género se valida si es no nulo o no vacía.
     */
    public function validateGenderIdentity($genderIdentity){

        if (!is_null($genderIdentity) && !empty($genderIdentity) && !in_array($genderIdentity, ["Mujer", "Hombre", "Mujer trans", "Hombre trans", "Persona no binaria", "Persona de género fluido", "Persona agénero", "Otro"], true)){
            respondWithError("Identidad de género no válida", 400);
        }
    }

    /**
     * Valida el estado de una denuncia.
     * Un estado válido es no nulo y tiene el valor de 0, 1 o 2.
     */
    public function validateState($state){

        if (is_null($state) || !is_numeric($state) || !in_array((int)$state, [0, 1, 2])) {
            respondWithError("Estado no válido", 400);
        }
    }
}