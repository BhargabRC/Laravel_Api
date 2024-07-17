<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\Team;
use App\Http\Requests\TeamStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        $team = Team::all();

        // Return Json Response
        return response()->json([
            'team' => $team
        ], 200);
    }
    public function create()
    {
        //return response()->json(Team::all());
    }

    public function store(TeamStoreRequest $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'team_mem_img' => 'required|image|mimes:png,jpg,jpeg,webp',
        //     'mem_name' => 'required|string|max:255',
        //     'mem_role' => 'required|string|max:255',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => "Invalid Input",
        //         'error' => $validator->errors()
        //     ], 400);
        // }

        // $file = $request->file('team_mem_img');
        // $filename = $file->getClientOriginalName();
        // $path=public_path('member_img');
        // $file->move(public_path('member_img'), $filename);

        // $team = Team::create([
        //     'team_mem_img' => $path.$filename,
        //     'mem_name' => $request->input('mem_name'),
        //     'mem_role' => $request->input('mem_role'),
        // ]);

        // return response()->json($team);

        try {
            $imageName = Str::random(32) . "." . $request->team_mem_img->getClientOriginalExtension();

            // Create Team
            Team::create([
                'team_mem_img' => $imageName,
                'mem_name' => $request->mem_name,
                'mem_role' => $request->mem_role
            ]);

            // Save Image in Storage folder
            Storage::disk('public')->put('member_img/' .$imageName, file_get_contents($request->team_mem_img));

            // Return Json Response
            return response()->json([
                'message' => "Team successfully created."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function show($id)
    {
        // Team Detail 
        $team = Team::find($id);
        if (!$team) {
            return response()->json([
                'message' => 'Team Not Found.'
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'team' => $team
        ], 200);
    }



    public function update(TeamStoreRequest $request, $id)
    {
        //     $validator = Validator::make($request->all(), [
        //         'team_mem_img' => 'nullable|image|mimes:png,jpg,jpeg,webp',
        //         'mem_name' => 'required|string|max:255',
        //         'mem_role' => 'required|string|max:255',
        //     ]);

        //     if ($validator->fails()) {
        //         return response()->json([
        //             'success' => false,
        //             'message' => "Invalid Input",
        //             'error' => $validator->errors()
        //         ], 400);
        //     }

        //     $teamMember = Team::find($id);

        //     if (!$teamMember) {
        //         return response()->json(['error' => 'Team member not found.'], 404);
        //     }

        //     if($request->has('team_mem_img')){

        //         $file = $request->file('team_mem_img');
        //         $extension = $file->getClientOriginalExtension();

        //         $filename = time().'.'.$extension;

        //         $path = public_path('member_img');
        //         $file->move($path, $filename);

        //         if(File::exists($teamMember->team_mem_img)){
        //             File::delete($teamMember->team_mem_img);
        //         }
        //     }


        //     // Update other fields
        //     $teamMember->update([
        //         'team_mem_img' => $path.$filename,
        //         'mem_name' => $request->mem_name,
        //         'mem_role' => $request->mem_role,


        //     ]);


        //     return response()->json($teamMember);
        // }

        try {
            // Find team
            $team = Team::find($id);
            if (!$team) {
                return response()->json([
                    'message' => 'Team Not Found.'
                ], 404);
            }

            //echo "request : $request->image";
            $team->mem_name = $request->mem_name;
            $team->mem_role = $request->mem_role;

            if ($request->team_mem_img) {

                // Public storage
                $storage = Storage::disk('public');

                // Old iamge delete
                if ($storage->exists($team->team_mem_img))
                    $storage->delete($team->team_mem_img);

                // Image name
                $imageName = Str::random(32) . "." . $request->team_mem_img->getClientOriginalExtension();
                $team->team_mem_img = $imageName;

                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->team_mem_img));
            }

            // Update Team
            $team->save();

            // Return Json Response
            return response()->json([
                'message' => "Team successfully updated."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }
}
