<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
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
    //
}
