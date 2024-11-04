<?php

namespace App\Http\Controllers;

use App\Models\Subtask;
use App\Models\Task;
use Illuminate\Http\Request;

class SubtaskController extends Controller
{
    public function getAllByTaskId() {
        $taskId = request()->taskId;
        $subtasks = Subtask::where('task_id', $taskId)->get();
        return response()->json([
            "success" => true,
            "message" => "Subtasks retrieved successfully.",
            "data" => $subtasks
        ], 200);
    }

    public function store(Request $request) {
        $subtask = new Subtask();
        $subtask->task_id = $request->taskId;
        $subtask->title = $request->title;

        if($subtask->save()) {
            return response()->json([
                "success" => true,
                "message" => "Subtask created successfully.",
                "data" => $subtask
            ], 201);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Subtask creation failed.",
                "data" => $subtask
            ], 503);
        }
    }

    public function show(Request $request) {
        $subtask = Subtask::find($request->id);
        if($subtask) {
            return response()->json([
                "success" => true,
                "message" => "Subtask retrieved successfully.",
                "data" => $subtask
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Subtask not found.",
                "data" => $subtask
            ], 404);
        }
    }

    public function update(Request $request) {
        $subtask = Subtask::find($request->id);
        if($subtask) {
            $subtask->title = $request->title;
            $subtask->status = $request->status;
            $subtask->completed_at = $request->completed_at;

            if($subtask->save()) {
                $subtasks = Subtask::where('task_id', $request->taskId)->where('status', 'ongoing')->get();

                if ($subtasks->count() === 0) {
                    Task::where('id', $request->taskId)->update(['status' => 'completed']);
                } else {
                    Task::where('id', $request->taskId)->update(['status' => 'ongoing']);
                }
                return response()->json([
                    "success" => true,
                    "message" => "Subtask updated successfully.",
                    "data" => $subtask
                ], 200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Subtask update failed.",
                    "data" => $subtask
                ], 503);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Subtask not found.",
                "data" => $subtask
            ], 404);
        }
    }

    public function destroy() {
        $subtask = Subtask::find(request()->subtask_id);
        if($subtask) {
            $subtask->delete();
            return response()->json([
                "success" => true,
                "message" => "Subtask deleted successfully.",
                "data" => $subtask
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Subtask not found.",
                "data" => $subtask
            ], 404);
        }
    }
}
