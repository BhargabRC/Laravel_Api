<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            return [
                'banner_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'title' => 'required|string|max:258',
                'heading' => 'required|string|max:258',
                'description1' => 'required|string|max:258',
                'image1' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'image2' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'quote' => 'required|string|max:258',
                'description2' => 'required|string|max:258'
            ];
        } else {
            return [
                'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'title' => 'required|string|max:258',
                'heading' => 'required|string|max:258',
                'description1' => 'required|string|max:258',
                'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'quote' => 'required|string|max:258',
                'description2' => 'required|string|max:258'
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'banner_image.required' => 'Banner Image is required!',
                'title.required' => 'Title is required!',
                'heading.required' => 'Heading is required!',
                'description1.required' => 'First Description is required!',
                'images.required' => 'Images is required!',
                'quote.required' => 'Quote is required!',
                'description2.required' => 'Second Description is required!',
            ];
        } else {
            return [
                'title.required' => 'Title is required!',
                'heading.required' => 'Heading is required!',
                'description1.required' => 'First Description is required!',
                'quote.required' => 'Quote is required!',
                'description2.required' => 'Second Description is required!',
            ];
        }
    }
    
}
