<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectInquiry extends Model
{
    protected $table = 'project_inquiries';

    protected $fillable = [
        'client_name',
        'client_email',
        'client_phone',
        'company',
        'project_type',
        'budget',
        'description',
        'date',
    ];
}
