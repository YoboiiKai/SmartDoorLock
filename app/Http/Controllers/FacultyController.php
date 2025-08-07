<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Http\Requests\StoreFacultyRequest;
use App\Http\Requests\UpdateFacultyRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Faculty::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('faculty_id', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }

        // Filter by department
        if ($request->has('department') && $request->department) {
            $query->byDepartment($request->department);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->inactive();
            }
        }

        $faculties = $query->orderBy('name')
                          ->paginate(10)
                          ->withQueryString();

        return Inertia::render('Admin/Faculty', [
            'faculties' => $faculties,
            'filters' => $request->only(['search', 'department', 'status']),
            'departments' => Faculty::distinct()->pluck('department')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Faculty/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFacultyRequest $request)
    {
        Faculty::create($request->validated());

        return redirect()->route('faculties.index')
                        ->with('success', 'Faculty member created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Faculty $faculty)
    {
        return Inertia::render('Faculty/Show', [
            'faculty' => $faculty
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faculty $faculty)
    {
        return Inertia::render('Faculty/Edit', [
            'faculty' => $faculty
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFacultyRequest $request, Faculty $faculty)
    {
        $faculty->update($request->validated());

        return redirect()->route('faculties.index')
                        ->with('success', 'Faculty member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faculty $faculty)
    {
        $faculty->delete();

        return redirect()->route('faculties.index')
                        ->with('success', 'Faculty member deleted successfully.');
    }

    /**
     * Bulk delete selected faculties.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:faculties,id'
        ]);

        Faculty::whereIn('id', $request->ids)->delete();

        return redirect()->route('faculties.index')
                        ->with('success', 'Selected faculty members deleted successfully.');
    }

    /**
     * Toggle faculty status (active/inactive).
     */
    public function toggleStatus(Faculty $faculty)
    {
        $faculty->update([
            'status' => $faculty->status === 'active' ? 'inactive' : 'active'
        ]);

        return redirect()->route('faculties.index')
                        ->with('success', 'Faculty status updated successfully.');
    }

    /**
     * Get faculties by department (API endpoint).
     */
    public function getByDepartment($department)
    {
        $faculties = Faculty::active()
                           ->byDepartment($department)
                           ->orderBy('name')
                           ->get();

        return response()->json($faculties);
    }
}