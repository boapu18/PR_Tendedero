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

    public function connect(){

        if (!$this -> conn){
            $this -> conn = new mysqli($this -> host, $this -> user, $this -> password, $this -> database);
        }

        return $this -> conn;
    }

    public function close(){
        if ($this -> conn){
            $this -> conn -> close();
            $this -> conn = null;
        }
    }
}