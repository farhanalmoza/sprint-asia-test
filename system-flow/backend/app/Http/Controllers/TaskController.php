<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getAll() {
        $tasks = Task::with('subtasks')->get();
        return response()->json([
            "success" => true,
            "message" => "Task retrieved successfully.",
            "data" => $tasks
        ], 200);
    }

    public function store(Request $request) {
        $task = new Task();
        $task->title = $request->title;
        $task->deadline = $request->deadline;

        if($task->save()) {
            return response()->json([
                "success" => true,
                "message" => "Task created successfully.",
                "data" => $task
            ], 201);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Task creation failed.",
                "data" => $task
            ], 503);
        }
    }

    public function show(Request $request) {
        $task = Task::find($request->id);
        if($task) {
            return response()->json([
                "success" => true,
                "message" => "Task retrieved successfully.",
                "data" => $task
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Task not found.",
                "data" => $task
            ], 404);
        }
    }

    public function update(Request $request) {
        $task = Task::find($request->id);
        if($task) {
            $task->title = $request->title;
            $task->deadline = $request->deadline;
            $task->status = $request->status;
            $task->completed_at = $request->completed_at;

            if($task->save()) {
                if ($task->status === "completed") {
                    Subtask::where('task_id', $request->id)->update(['status' => 'completed', 'completed_at' => date('Y-m-d H:i:s')]);
                } else {
                    Subtask::where('task_id', $request->id)->update(['status' => 'ongoing', 'completed_at' => null]);
                }
                return response()->json([
                    "success" => true,
                    "message" => "Task updated successfully.",
                    "data" => $task
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Task update failed.",
                    "data" => $task
                ], 503);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Task not found.",
                "data" => $task
            ], 404);
        }
    }

    public function destroy(Request $request) {
        $task = Task::find($request->id);
        if($task) {
            $task->delete();
            return response()->json([
                "success" => true,
                "message" => "Task deleted successfully.",
                "data" => $task
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Task not found.",
                "data" => $task
            ], 404);
        }
    }
}
