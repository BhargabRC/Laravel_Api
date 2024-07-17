<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\FaQ;

class FaQController extends Controller
{
    public function index()
    {
        return response()->json(FaQ::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'topic' => 'required|string|max:255',
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Input',
                'error' => $validator->errors()
            ], 400);
        }

        $faQ = FaQ::create([
            
            'topic' => $request->input('topic'),
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
        ]);

        return response()->json($faQ, 201);
    }

    public function show($id)
    {
        $faQ = FaQ::find($id);

        if (!$faQ) {
            return response()->json(['error' => 'FaQ not found'], 404);
        }

        return response()->json($faQ);
    }
    public function edit($id)
    {
        $faQ = FaQ::find($id);

        if (!$faQ) {
            return response()->json(['error' => 'FaQ not found'], 404);
        }

        return response()->json($faQ);
    }

    public function update(Request $request, $id)
    {
        $faQ = FaQ::find($id);

        if (!$faQ) {
            return response()->json(['error' => 'FaQ not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'topic' => 'required|string|max:255',
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Input',
                'error' => $validator->errors()
            ], 400);
        }

        $faQ->update([
            'topic' => $request->input('topic'),
            'question' => $request->input('question'),
            'answer' => $request->input('answer'),
        ]);

        return response()->json($faQ);
    }
}
