<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamStoreRequest extends FormRequest
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
                'team_mem_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'mem_name' => 'required|string|max:258',
                'mem_role' => 'required|string'
            ];
        } else {
            return [
                'team_mem_img' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
                'mem_name' => 'required|string|max:258',
                'mem_role' => 'required|string'
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'team_mem_img.required' => 'Image is required!',
                'mem_name.required' => 'Name is required!',
                'mem_role.required' => 'Role is required!'
            ];
        } else {
            return [
                'mem_name.required' => 'Name is required!',
                'mem_role.required' => 'Role is required!'
            ];
        }
    }
}
