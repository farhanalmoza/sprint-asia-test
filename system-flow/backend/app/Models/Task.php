<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'deadline',
        'status',
        'completed_at',
    ];

    public function subtasks()
    {
        return $this->hasMany(Subtask::class);
    }
}
