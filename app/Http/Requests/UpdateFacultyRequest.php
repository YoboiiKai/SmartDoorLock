<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Validation\Rule;

class UpdateFacultyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust authorization logic as needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $facultyId = $this->route('faculty')?->id;

        return [
            'faculty_id' => [
                'required',
                'string',
                'max:255',
                Rule::unique('faculties', 'faculty_id')->ignore($facultyId)
            ],
            'name' => 'required|string|max:255',
            'rfid_number' => 'nullable|string|max:255',
            'department' => 'required|string|max:255',
            'status' => 'required|in:active,inactive'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'faculty_id.required' => 'Faculty ID is required.',
            'faculty_id.unique' => 'This Faculty ID is already taken.',
            'name.required' => 'Faculty name is required.',
            'department.required' => 'Department is required.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be either active or inactive.'
        ];
    }
}
