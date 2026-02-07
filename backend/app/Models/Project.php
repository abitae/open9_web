<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'desc',
        'img',
        'tech',
        'impact',
    ];

    protected function casts(): array
    {
        return [
            'tech' => 'array',
        ];
    }
}
