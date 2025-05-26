<?php

class Report implements JsonSerializable {

    private $id;
    private $content;
    private $province;
    private $canton;
    private $email;
    private $ageBracket;
    private $state;
    private $genderIdentity;
    private $roleInInstitution;

    public function __construct($content, $province, $canton, $email, $ageBracket, $genderIdentity, $roleInInstitution, $id = null, $state = 0){
        $this -> id = $id;
        $this -> content = $content;
        $this -> province = $province;
        $this -> canton = $canton;
        $this -> email = $email;
        $this -> ageBracket = $ageBracket;
        $this -> genderIdentity = $genderIdentity;
        $this -> roleInInstitution = $roleInInstitution;
        $this -> state = $state;
    }

    public function getId(){
        return $this -> id;
    }

    public function setId($id){
        $this -> id = $id;
    }

    public function getContent(){
        return $this -> content;
    }
    
    public function setContent($content){
        $this -> content = $content;
    }
    
    public function getProvince(){
        return $this -> province;
    }
    
    public function setProvince($province){
        $this -> province = $province;
    }
    
    public function getCanton(){
        return $this -> canton;
    }
    
    public function setCanton($canton){
        $this -> canton = $canton;
    }
    
    public function getEmail(){
        return $this -> email;
    }
    
    public function setEmail($email){
        $this -> email = $email;
    }
    
    public function getAgeBracket(){
        return $this -> ageBracket;
    }
    
    public function setAgeBracket($ageBracket){
        $this -> ageBracket = $ageBracket;
    }
    
    public function getState(){
        return $this -> state;
    }
    
    public function setState($state){
        $this -> state = $state;
    }

    public function getGenderIdentity() {
        return $this->genderIdentity;
    }
    
    public function setGenderIdentity($genderIdentity) {
        $this->genderIdentity = $genderIdentity;
    }
    
    public function getRoleInInstitution() {
        return $this->roleInInstitution;
    }
    
    public function setRoleInInstitution($roleInInstitution) {
        $this->roleInInstitution = $roleInInstitution;
    }
    

    public function jsonSerialize() {
        
        $data = [
            'id' => $this -> id,
            'content' => $this -> content,
            'province' => $this -> province,
            'canton' => $this -> canton,
            'email' => $this -> email,
            'ageBracket' => $this -> ageBracket,
            'state' => $this -> state,
            'genderIdentity' => $this->genderIdentity,
            'roleInInstitution' => $this->roleInInstitution,
        ];

        return array_filter($data, function($value) {
            return $value !== null;
        });
    }
}