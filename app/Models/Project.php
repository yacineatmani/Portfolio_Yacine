<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'technologies', 'github_link', 'demo_link', 'image', 'user_id'
    ];

    // Accessor pour obtenir l'URL complète de l'image
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}