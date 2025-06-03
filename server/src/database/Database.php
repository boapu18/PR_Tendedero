<?php

class Database {

    private $host;
    private $user;
    private $password;
    private $database;
    private $conn;

    public function __construct() {
        $this -> host = getenv('HOST');
        $this -> user = getenv('USER');
        $this -> password = getenv('PASSWORD');
        $this -> database = getenv('DATABASE');
    }

    /**
     * @return mysqli Retorna el objeto de conexión a la base de datos.
     */
    public function connect(){

        if (!$this -> conn){
            $this -> conn = new mysqli($this -> host, $this -> user, $this -> password, $this -> database);

            if ($this -> conn -> connect_error){
                throw new Exception("No se ha podido establecer la conexión con la base de datos");
            }
        }

        return $this -> conn;
    }

    /**
     * Cierra la conexión a la base de datos.
     */
    public function close(){
        if ($this -> conn){
            $this -> conn -> close();
            $this -> conn = null;
        }
    }
}