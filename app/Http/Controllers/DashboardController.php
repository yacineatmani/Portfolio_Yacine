<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use App\Models\User; // Assurez-vous que le modèle User est importé
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $projects = Project::where('user_id', $user->id)->latest()->get();
        $skills = Skill::where('user_id', $user->id)->latest()->get();

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'projects' => $projects,
            'skills' => $skills,
        ]);
    }

    public function new()
    {
        // Nouvelle version du dashboard avec mock data pour la démo
        return Inertia::render('DashboardNew');
    }

    public function storeProject(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'technologies' => 'nullable|string|max:255',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }
        
        auth()->user()->projects()->create($data);

        return redirect()->route('dashboard.index')->with('success', 'Projet ajouté avec succès.');
    }

    public function destroyProject(Project $project)
    {
        if ($project->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return redirect()->route('dashboard.index')->with('success', 'Projet supprimé.');
    }

    public function storeSkill(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|in:débutant,confirmé,expert',
            'category' => 'nullable|string|max:255',
        ]);

        auth()->user()->skills()->create($data);

        return redirect()->route('dashboard.index')->with('success', 'Compétence ajoutée.');
    }

    public function destroySkill(Skill $skill)
    {
        if ($skill->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $skill->delete();

        return redirect()->route('dashboard.index')->with('success', 'Compétence supprimée.');
    }

    public function uploadCv(Request $request)
    {
        $request->validate([
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB Max
        ]);

        $user = auth()->user();

        // Supprimer l'ancien CV s'il existe
        if ($user->cv_path) {
            Storage::disk('public')->delete($user->cv_path);
        }

        $path = $request->file('cv')->store('cvs', 'public');

        $user->forceFill(['cv_path' => $path])->save();

        return redirect()->route('dashboard.index')->with('success', 'CV mis à jour.');
    }
}