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
        $user = User::first();
        
        // Si aucun utilisateur n'existe, utiliser des données par défaut
        if (!$user) {
            return Inertia::render('Home', [
                'user' => [
                    'id' => 1,
                    'name' => 'Yacine Atmani',
                    'first_name' => 'Yacine',
                    'bio' => 'Développeur Full Stack passionné par les technologies modernes',
                    'photo' => null,
                    'cv' => null,
                ],
                'projects' => [],
                'skills' => [],
                'experiences' => []
            ]);
        }
        
        $projects = $user->projects()->get();
        $skills = $user->skills()->get();
        // Pas de modèle Experience pour le moment, utilisons des données fixes
        $experiences = collect([
            [
                'id' => 1,
                'role' => 'Développeur Full Stack',
                'company' => 'MolenGeek',
                'period' => '2024 - Présent',
                'description' => 'Formation intensive en développement web moderne avec focus sur React et Laravel',
                'technologies' => 'React,Laravel,JavaScript,PHP'
            ],
            [
                'id' => 2,
                'role' => 'Développeur Frontend',
                'company' => 'Projets Personnels',
                'period' => '2023 - 2024',
                'description' => 'Développement d\'applications web modernes et responsive',
                'technologies' => 'HTML,CSS,JavaScript,React'
            ]
        ]);

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
            'experiences' => $experiences->map(function ($experience) {
                return [
                    'id' => $experience['id'],
                    'role' => $experience['role'],
                    'company' => $experience['company'],
                    'period' => $experience['period'],
                    'description' => $experience['description'],
                    'tech' => $experience['technologies'] ? explode(',', $experience['technologies']) : [],
                ];
            }),
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
