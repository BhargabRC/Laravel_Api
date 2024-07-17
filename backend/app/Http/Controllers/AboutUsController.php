<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AboutUs;

class AboutUsController extends Controller
{
    public function index()
    {
        //  return response()->json(AboutUs::all());
        $data = AboutUs::all(); // Fetch data from your database

        return view('aboutus', compact('data'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'video' => 'nullable|string',
            'heading' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            // return response()->json([
            //     'success' => false,
            //     'message' => 'Invalid Input',
            //     'error' => $validator->errors()
            // ], 400);
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $aboutUs = AboutUs::create([
            'video' => $request->input('video'),
            'heading' => $request->input('heading'),
            'description' => $request->input('description'),
        ]);

        // return response()->json($aboutUs, 201);
        return redirect()->route('aboutus.index')->with('success', 'AboutUs created successfully!');
    }

    public function show($id)
    {
        $aboutUs = AboutUs::find($id);

        if (!$aboutUs) {
            return response()->json(['error' => 'AboutUs not found'], 404);
            // return redirect()->route('aboutus.index')->with('error', 'AboutUs not found');
        }

        return response()->json($aboutUs);
        // return view('aboutus.show', compact('aboutUs'));
    }

    public function edit($id)
    {
        $data = AboutUs::find($id);

        if (!$data) {
            return redirect()->route('aboutus.index')->with('error', 'AboutUs not found');
        }

        return view('edit', compact('data', 'id'));
    }

    public function update(Request $request, $id)
    {
        $aboutUs = AboutUs::find($id);

        if (!$aboutUs) {
            return response()->json(['error' => 'AboutUs not found'], 404);
            // return redirect()->route('aboutus.index')->with('error', 'AboutUs not found');
        }

        $validator = Validator::make($request->all(), [
            'video' => 'nullable|string',
            'heading' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Input',
                'error' => $validator->errors()
            ], 400);
            // return redirect()->back()->withErrors($validator)->withInput();
        }

        $aboutUs->update([
            'video' => $request->input('video'),
            'heading' => $request->input('heading'),
            'description' => $request->input('description'),
        ]);

        return response()->json($aboutUs);
        // return redirect()->route('aboutus.index')->with('success', 'AboutUs updated successfully!');
    }
}
