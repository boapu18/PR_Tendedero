<?php

namespace src;
use MongoDB\Client;

class Database {

    private $client;
    private $db;

    /**
     * Inicializa un cliente con la base de datos de MongoDB.
     * Coloca la base de datos del tendedero virtual.
     */
    public function __construct(){
        
        $uri = $_ENV['MONGO_DB_URI'];

        $this -> client = new Client($uri);
        $this -> client -> selectDatabase('Tendedero_Virtual') -> command(['ping' => 1]);
        $this -> db = $this -> client -> selectDatabase('Tendedero_Virtual');
    }

    public function getCollection($collection){
        return $this -> db -> $collection;
    }
}