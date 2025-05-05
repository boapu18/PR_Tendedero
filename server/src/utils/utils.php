<?php

// -------------------------------------------------------------------------------------------------------------------------
// Funciones de manejo de respuestas
// -------------------------------------------------------------------------------------------------------------------------

function respondWithError($message, $statusCode){
    header("Content-Type: application/json");
    http_response_code($statusCode);
    echo json_encode(["status" => "error", "message" => $message]);
    exit;
}

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