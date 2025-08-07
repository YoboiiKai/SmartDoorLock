<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'name',
        'rfid_number',
        'department',
        'status',
    ];

    protected $casts = [
        'status' => 'string'
    ];

    // Scope for active faculty
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Scope for inactive faculty
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    // Get faculty by department
    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }
}