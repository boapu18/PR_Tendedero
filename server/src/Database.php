<?php

namespace src;
use Exception;
use MongoDB\Client;

class Database {

    private $client;
    private $db;

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