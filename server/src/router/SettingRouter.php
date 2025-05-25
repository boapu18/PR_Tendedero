<?php

class SettingRouter {

    private $settingController;

    public function __construct($settingController){
        $this -> settingController = $settingController;
    }

    public function getSettings(){

        try {

            $settings = $this -> settingController -> getSettings();
            $data = ["settings" => $settings];
            respondWithSuccess($data, "Configuraciones obtenidas exitosamente", 200);
        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }

    public function patchSettings(){

        try {

        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }
}