<?php

namespace app\models;

class Contact extends Model
{
    protected $table = 'contact_submissions';

    public function save($data)
    {
        return $this->query(
            "INSERT INTO {$this->table} (first_name, last_name, email, feedback) VALUES (?, ?, ?, ?)",
            [
                $data['first_name'],
                $data['last_name'],
                $data['email'],
                $data['feedback']
            ]
        );
    }
}
