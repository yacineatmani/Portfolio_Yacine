<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'message' => 'required|string|max:5000',
            ]);

            // Send email
            Mail::to('yacineatmani1080l@gmail.com')->send(new ContactMessage($validated));

            // Pour Inertia : réponse vide (succès)
            return response('', 204);
        } catch (\Exception $e) {
            Log::error('Contact form submission failed: ' . $e->getMessage());
            // Pour Inertia : retourne une erreur de validation
            return back()->withErrors(['message' => 'Failed to send message']);
        }
    }
}