@component('mail::message')
# New Contact Form Submission

You have received a new message from your portfolio contact form.

**Name:** {{ $data['name'] }}  
**Email:** {{ $data['email'] }}  
**Message:**  
{{ $data['message'] }}

@component('mail::button', ['url' => 'mailto:' . $data['email']])
Reply to {{ $data['name'] }}
@endcomponent

Thanks,  
{{ config('app.name') }}
@endcomponent