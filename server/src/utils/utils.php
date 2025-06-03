<?php

// -------------------------------------------------------------------------------------------------------------------------
// Funciones utilitarias
// -------------------------------------------------------------------------------------------------------------------------

/**
 * Envía una respuesta de error a la solicitud.
 * @param string $message El mensaje a enviar en la respuesta.
 * @param int $statusCode El código de respuesta.
 */
function respondWithError($message, $statusCode){
    header("Content-Type: application/json");
    http_response_code($statusCode);
    echo json_encode(["status" => "error", "message" => $message]);
    exit;
}

/**
 * Envía una respuesta de éxito a la solicitud.
 * @param Object[]|null $data Los datos a enviar en la respuesta. Null si no desea enviar datos.
 * @param string $message El mensaje a enviar en la respuesta.
 * @param int $statusCode El código de respuesta.
 */
function respondWithSuccess($data, $message, $statusCode){
    header("Content-Type: application/json");
    http_response_code($statusCode);

    if (is_null($data)){
        echo json_encode(["status" => "success", "message" => $message]);
    } else {
        echo json_encode(["status" => "success", "message" => $message, "data" => $data]);
    }
    
    exit;
}

/**
 * 
 * Sanitiza el texto de entrada.
 * 
 * @param string $text El texto a sanitizar
 * @return string|null Retorna el texto sin espacios adicionales (al prinicipio y al final) y con
 * etiquetas HTML y código PHP eliminadas. Retorna null si el texto enviado era nulo.
 */
function sanitizeText($text){

    if (is_null($text)){
        return $text;
    }

    $clean = strip_tags($text);
    $clean = trim($clean);
    return $clean;
}