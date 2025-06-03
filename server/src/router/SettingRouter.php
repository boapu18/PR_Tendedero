<?php

class SettingRouter {

    private $settingController;
    private $routeProtecter;

    public function __construct($settingController, $routeProtecter){
        $this -> settingController = $settingController;
        $this -> routeProtecter = $routeProtecter;
    }

    /**
     * Obtiene las configuraciones del sistema.
     */
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

    /**
     * Actualiza las configuraciones del sistema.
     */
    public function patchSettings(){

        // Verificación de autorización
        $this -> routeProtecter -> checkAuth();

        $data = json_decode(file_get_contents("php://input"), true);
        $settings = $data["settings"] ?? null;

        // Se verifica que se envíe al menos una configuración
        if (is_null($settings) || count($settings) == 0){
            respondWithError("Debe incluir al menos una configuración", 400);
        }
        
        // Se convierten las configuraciones a objetos Setting
        // Se verifica que cada configuración cuente con los atributos 'name' y 'value'
        $settingsObjects = [];
        
        foreach ($settings as $setting) {

            if (isset($setting['name']) && isset($setting['value'])) {
                $settingsObjects[] = new Setting(sanitizeText($setting['name']), sanitizeText($setting['value']));
            } else {
                respondWithError("Cada configuración enviada debe tener un campo 'name' y 'value'", 400);
            }
        }

        // Se verifica que si la configuración de mostrar enlace está habilita
        // entonces se provea un enlace válido (no vacío)
        $showExternalFormLinkSetting = null;
        $externalFormLinkSetting = null;
        
        foreach ($settingsObjects as $settingObj) {
            
            if ($settingObj -> getName() === 'showExternalFormLink') {
                $showExternalFormLinkSetting = $settingObj;
            } else if ($settingObj -> getName() === 'externalFormLink'){
                $externalFormLinkSetting = $settingObj;
            }
        }

        if ($showExternalFormLinkSetting -> getValue() === true && $externalFormLinkSetting -> getValue() === ""){
            respondWithError("Al habilitar la opción 'Habilitar Enlace a Formulario Externo' debe proporcionar un enlace válido", 400);
            return;
        }

        try {
            
            // Se actualizan las configuraciones
            $success = $this -> settingController -> updateSettings($settingsObjects);
    
            if ($success) {
                respondWithSuccess(null, "Configuraciones actualizadas exitosamente", 200);
            } else {
                respondWithError("Ocurrió un error al actualizar las configuraciones", 500);
            }

        } catch (Exception $e){
            error_log($e -> getMessage());
            respondWithError("Se produjo un error inesperado, intente nuevamente más tarde", 500);
        }
    }
}