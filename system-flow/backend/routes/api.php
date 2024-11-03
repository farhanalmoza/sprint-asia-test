<?php

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
});

Route::prefix('/subtasks')->group(function () {
    Route::get('/{id}', [TaskController::class, 'getAllByTaskId']);
    Route::post('/{id}', [TaskController::class, 'store']);
    Route::get('/{id}/{subtask_id}', [TaskController::class, 'show']);
    Route::put('/{id}/{subtask_id}', [TaskController::class, 'update']);
    Route::delete('/{id}/{subtask_id}', [TaskController::class, 'destroy']);
});
