<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Skill;
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
            ],
            'projects' => $projects,
            'skills' => $skills,
        ]);
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
