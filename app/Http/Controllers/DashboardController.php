<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Apply middleware as a property
    protected $middleware = ['auth'];

    public function index()
    {
        $projects = Project::where('user_id', auth()->id())->get();
        $skills = Skill::where('user_id', auth()->id())->get();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'skills' => $skills,
        ]);
    }

// app/Http/Controllers/DashboardController.php
public function storeProject(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'github_link' => 'nullable|url',
        'demo_link' => 'nullable|url',
        'image' => 'nullable|image|max:2048',
    ]);

    $data = $request->all();
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('projects', 'public');
    }
    $data['user_id'] = auth()->id();

    Project::create($data);

    return redirect()->route('dashboard');
}

    public function storeSkill(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|in:débutant,confirmé,expert',
        ]);

        Skill::create([
            'name' => $request->name,
            'level' => $request->level,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('dashboard');
    }
  
public function destroyProject(Project $project)
{
    // Optionnel : vérifier que l'utilisateur est bien le propriétaire
    if ($project->user_id !== auth()->id()) {
        abort(403);
    }
    $project->delete();
    return redirect()->route('dashboard');
}
}