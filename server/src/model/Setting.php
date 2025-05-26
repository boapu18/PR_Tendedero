<?php

class Setting implements JsonSerializable {

    private $name;
    private $value;

    public function __construct($name, $value){
        $this -> name = $name;
        $this -> value = $this -> interpretValue($value);
    }

    private function interpretValue($value) {
        
        $lower = strtolower(trim($value));
    
        if (in_array($lower, ['true', 'yes', 'on'], true)) {
            return true;
        }
    
        if (in_array($lower, ['false', 'no', 'off'], true)) {
            return false;
        }
    
        if (is_numeric($value)) {
            return strpos($value, '.') !== false ? (float)$value : (int)$value;
        }
    
        return $value;
    }

    public function getName() {
        return $this -> name;
    }

    public function getValue() {
        return $this -> value;
    }

    public function getValueStr() {
        if (is_bool($this->value)) {
            return $this->value ? 'true' : 'false';
        }
        return (string) $this->value;
    }

    public function setName($name) {
        $this -> name = $name;
    }

    public function setValue($value) {
        $this -> value = $value;
    }

    public function jsonSerialize() {
        return [
            'name' => $this -> name,
            'value' => $this -> value
        ];
    }
}