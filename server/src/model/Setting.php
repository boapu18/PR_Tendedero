<?php

class Setting implements JsonSerializable {

    private $id;
    private $name;
    private $value;


    public function __construct($id, $name, $value){
        $this -> id = $id;
        $this -> name = $name;
        $this -> value = $value;
    }

    public function getId() {
        return $this -> id;
    }

    public function getName() {
        return $this -> name;
    }

    public function getValue() {
        return $this -> value;
    }

    public function setId($id) {
        $this -> id = $id;
    }

    public function setName($name) {
        $this -> name = $name;
    }

    public function setValue($value) {
        $this -> value = $value;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'value' => $this->value
        ];
    }
}