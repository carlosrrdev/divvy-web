<script>
    import '../app.css';
    import MenuIcon from '$lib/components/MenuIcon.svelte';
    import SettingsIcon from '$lib/components/SettingsIcon.svelte';
    import Toast from '$lib/components/Toast.svelte';

    let { children } = $props();
</script>

<div class="w-screen min-h-dvh flex flex-col lg:gap-y-8 bg-amber-200/5 dark:bg-slate-900/50">
    <header class="flex w-full max-w-screen-lg mx-auto">
        <nav class="flex-1 flex justify-between items-center p-6">
            <MenuIcon class="text-2xl" />
            <a class="font-bold text-2xl" href="/">divvy</a>
            <SettingsIcon class="text-2xl" />
        </nav>
    </header>
    <main class="w-full max-w-screen-lg mx-auto flex-1 flex flex-col p-6">
        {@render children()}
    </main>
    <footer class="w-full max-w-screen-lg mx-auto flex p-6">
        <div class="flex-1 flex flex-col items-center">
            <small>&copy; 2025 - Carlos R. Rodriguez</small>
            <div class="text-sm flex space-x-2 justify-center">
                <a class="underline" href="https://github.com/carlosrrdev/divvy-web">github</a>
                <a class="underline" href="/">tips</a>
            </div>
        </div>
    </footer>
</div>
<Toast />
