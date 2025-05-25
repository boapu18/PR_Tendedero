<?php

class SettingController {

    private $database;

    public function __construct($database){
        $this -> database = $database;
    }

    /**
     * Obtiene las configuraciones de administración registradas.
     * 
     * @return Setting[] Un array de objetos Setting, donde cada objeto es una configuración.
     */
    public function getSettings(){

        $conn = $this -> database -> connect();

        $query = "SELECT id, name, value FROM Setting";
        $stmt = $conn -> prepare($query);

        $stmt -> execute();
        $result = $stmt -> get_result();
    
        $this -> database -> close();
        $stmt -> close();

        if ($result -> num_rows > 0) {

            $settings = [];

            while ($row = $result -> fetch_assoc()) {
                
                $setting = new Setting(
                    $row['id'],  
                    $row['name'], 
                    $row['value']
                );
                
                $settings[] = $setting;
            }

            return $settings;

        } else {
            return [];
        }
    }

    /**
     * Actualiza las configuraciones del sistema pasados por parámetro.
     * 
     * @param Setting[] $settings Un array de objetos Setting, donde cada objeto es una configuración.
     * @return bool Retorna true si las configuraciones se actualizaron correctamente, y false en el caso contrario.
     */
    public function updateSettings($settings){

        $conn = $this -> database -> connect();
    }
}