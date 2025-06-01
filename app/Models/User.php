<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'first_name',
        'email',
        'password',
        'bio',
        'photo',
        'cv', // Ajoute ce champ si tu veux stocker le chemin du CV
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}