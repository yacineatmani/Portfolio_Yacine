<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

public function build()
{
    return $this->from(config('mail.from.address'), config('mail.from.name'))
                ->subject('New Contact Form Submission')
                ->markdown('emails.contact') // <-- Utilise markdown ici
                ->with(['data' => $this->data]);
}
}