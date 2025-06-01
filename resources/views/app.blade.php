<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') === 'dark' || ($appearance === 'system' && request()->cookie('appearance', 'system') === 'dark')])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Portfolio de Yacine Atmani, développeur full-stack spécialisé en Laravel, React et DevOps.">
    <meta name="description" content="Yacine Atmani - Frontend, Backend, Full Stack, DevOps Portfolio">
    <!-- Title -->
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Favicons -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Vite and Inertia -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
    <!-- Dark mode initialization -->
    <script>
        (function() {
            const appearance = localStorage.getItem('appearance') || '{{ $appearance ?? "system" }}';
            if (appearance === 'system') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } else {
                document.documentElement.classList.toggle('dark', appearance === 'dark');
            }
        })();
    </script>
</body>
</html>