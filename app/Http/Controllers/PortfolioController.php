<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{

public function index()
    {
        $user = User::first() ?? abort(404, 'No user found');
        $projects = $user->projects()->get();
        $skills = $user->skills()->get();

        return Inertia::render('Home', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'first_name' => $user->first_name,
                'bio' => $user->bio,
                'photo' => $user->photo,
                'cv' => $user->cv,
            ],
            'projects' => $projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'github_link' => $project->github_link,
                    'demo_link' => $project->demo_link,
                    'image' => $project->image,
                    'stack' => $project->technologies ? explode(',', $project->technologies) : [],
                    'challenges' => $project->description, // On utilise la description comme fallback
                ];
            }),
            'skills' => $skills,
        ]);
    }
    public function downloadCv()
    {
        $user = User::first();
        
        if (!$user || !$user->cv) {
            abort(404, 'CV non trouvé');
        }
        
        $cvPath = storage_path('app/public/' . $user->cv);
        
        if (!file_exists($cvPath)) {
            abort(404, 'Fichier CV non trouvé');
        }
        
        return response()->download($cvPath, 'CV_' . $user->name . '.pdf');
    }

    public function uploadCv(Request $request)
{
    $request->validate([
        'cv' => 'required|mimes:pdf|max:2048',
    ]);
    $user = auth()->user();
    if ($request->hasFile('cv')) {
        $path = $request->file('cv')->store('cv', 'public');
        $user->cv = $path;
        $user->save();
    }
    return redirect()->back();
}
}
