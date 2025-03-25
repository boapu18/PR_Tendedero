<?php

namespace src;

class ReportController {

    private $database;

    public function __construct(){
        $this -> database = new Database();
    }

    // Obtiene un batch de denuncias ordenadas en orden cronológico
    public function getReportsInChronologicalOrder($page){

        $limit = 14;
        $skip = ($page - 1) * $limit;

        $reportCollection = $this -> database -> getCollection('Report');

        $fields = ['content' => 1, 'province' => 1, 'canton' => 1, 'ageBracket' => 1];

        $cursor = $reportCollection -> find([], [
            'skip' => $skip,
            'limit' => $limit,
            'projection' => $fields,
        ]);

        $reports = iterator_to_array($cursor);

        return $reports;
    }
}