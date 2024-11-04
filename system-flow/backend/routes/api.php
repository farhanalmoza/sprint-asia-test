<?php

use App\Http\Controllers\SubtaskController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('/tasks')->group(function () {
    Route::get('/', [TaskController::class, 'getAll']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{id}', [TaskController::class, 'show']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);

    Route::prefix('/{taskId}/subtasks')->group(function () {
        Route::get('/', [SubtaskController::class, 'getAllByTaskId']);
        Route::post('/', [SubtaskController::class, 'store']);
        Route::get('/{subtask_id}', [SubtaskController::class, 'show']);
        Route::put('/{subtask_id}', [SubtaskController::class, 'update']);
        Route::delete('/{subtask_id}', [SubtaskController::class, 'destroy']);
    });
});
