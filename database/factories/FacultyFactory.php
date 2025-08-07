<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faculty>
 */
class FacultyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = [
            'Computer Science', 
            'Information Technology', 
            'Engineering', 
            'Mathematics', 
            'Physics', 
            'Chemistry', 
            'Business Administration',
            'Education',
            'Arts and Literature'
        ];

        return [
            'faculty_id' => 'FAC-' . $this->faker->unique()->randomNumber(6),
            'name' => $this->faker->name(),
            'rfid_number' => $this->faker->optional()->regexify('[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{6}'),
            'department' => $this->faker->randomElement($departments),
            'status' => $this->faker->randomElement(['active', 'inactive'])
        ];
    }
}
