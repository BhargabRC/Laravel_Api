<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\BlogStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blog = Blog::all();

        // Return Json Response
        return response()->json([
            'blog' => $blog
        ], 200);
    }

    public function store(BlogStoreRequest $request)
    {

        try {
            $imageBanner = Str::random(32) . "." . $request->banner_image->getClientOriginalExtension();
            $imageName1 = Str::random(32) . "." . $request->image1->getClientOriginalExtension();
            $imageName2 = Str::random(32) . "." . $request->image2->getClientOriginalExtension();

            // Create Blog
            Blog::create([
                'banner_image' => $imageBanner,
                'title' => $request->title,
                'heading' => $request->heading,
                'description1' => $request->description1,
                'image1' => $imageName1,
                'image2' => $imageName2,
                'quote' => $request->quote,
                'description2' => $request->description2

            ]);

            // Save Image in Storage folder
            Storage::disk('public')->put('banner_img/' . $imageBanner, file_get_contents($request->banner_image));
            Storage::disk('public')->put('blog_img1/' . $imageName1, file_get_contents($request->image1));
            Storage::disk('public')->put('blog_img2/' . $imageName2, file_get_contents($request->image2));

            // Return Json Response
            return response()->json([
                'message' => "Blog successfully created."
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
        // blog Detail 
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json([
                'message' => 'Blog Not Found.'
            ], 404);
        }

        // Return Json Response
        return response()->json([
            'blog' => $blog
        ], 200);
    }

    public function update(BlogStoreRequest $request, $id)
    {

        try {
            // Find Blog
            $blog = Blog::find($id);
            if (!$blog) {
                return response()->json([
                    'message' => 'Blog Not Found.'
                ], 404);
            }

            $blog->title = $request->title;
            $blog->heading = $request->heading;
            $blog->description1 = $request->description1;
            $blog->quote = $request->quote;
            $blog->description2 = $request->description2;

            // Check if a new banner image is uploaded
            if ($request->hasFile('banner_image')) {
                // Generate a new random name for the banner image
                $imageBanner = Str::random(32) . "." . $request->banner_image->getClientOriginalExtension();
                // Delete the old banner image from storage
                Storage::disk('public')->delete('banner_img/' . $blog->banner_image);
                // Save the new banner image
                Storage::disk('public')->put('banner_img/' . $imageBanner, file_get_contents($request->banner_image));
                // Update the banner_image field in the database
                $blog->banner_image = $imageBanner;
            }

            // Check if a new images is uploaded
            if ($request->hasFile('image1')) {
                // Generate a new random name for the images
                $imageName1 = Str::random(32) . "." . $request->image1->getClientOriginalExtension();
                // Delete the old images from storage
                Storage::disk('public')->delete('blog_img1/' . $blog->image1);
                // Save the new images
                Storage::disk('public')->put('blog_img1/' . $imageName1, file_get_contents($request->image1));
                // Update the images field in the database
                $blog->image1 = $imageName1;
            }

            // Check if a new images is uploaded
            if ($request->hasFile('image2')) {
                // Generate a new random name for the images
                $imageName2 = Str::random(32) . "." . $request->image2->getClientOriginalExtension();
                // Delete the old images from storage
                Storage::disk('public')->delete('blog_img2/' . $blog->image2);
                // Save the new images
                Storage::disk('public')->put('blog_img2/' . $imageName2, file_get_contents($request->image2));
                // Update the images field in the database
                $blog->image2 = $imageName2;
            }


            // Update Blog
            $blog->save();

            // Return Json Response
            return response()->json([
                'message' => "Blog successfully updated."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }
}
