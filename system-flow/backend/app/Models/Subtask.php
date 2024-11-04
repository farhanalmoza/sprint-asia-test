<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    protected $table = 'subtasks';

    protected $fillable = [
        'task_id',
        'title',
        'status',
        'completed_at',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
