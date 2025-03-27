<?php

namespace src;
use Exception;

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

    public function submitReport($data) {

        if (!isset($data['description']) || trim($data['description']) === '') {
            throw new Exception("La descripción es obligatoria.");
        }

        $report = [
            'content' => $data['description'],
            'type' => $data['typeReport'],
            'createdAt' => new \MongoDB\BSON\UTCDateTime()
        ];

        if ($data['typeReport'] === 'addictional-information') {
            $report['email'] = $data['email'] ?? null;
            $report['province'] = $data['province'] ?? null;
            $report['canton'] = $data['canton'] ?? null;
            $report['ageBracket'] = $data['age'] ?? null;
        }

        // Save to database
        $reportCollection = $this->database->getCollection('Report');
        $insertResult = $reportCollection->insertOne($report);

        if ($insertResult->getInsertedCount() === 0) {
            throw new Exception("No se pudo guardar la denuncia.");

        }
        return "Denuncia registrada con éxito.";
    }
}