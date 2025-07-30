<script>
    import '../app.css';
    import MenuIcon from '$lib/components/MenuIcon.svelte';
    import SettingsIcon from '$lib/components/SettingsIcon.svelte';
    import Toast from '$lib/components/Toast.svelte';

    let { children } = $props();
</script>

<div class="w-screen min-h-dvh flex flex-col lg:gap-y-8 layout-bg">
    <header class="flex w-full max-w-screen-xl mx-auto">
        <nav class="flex-1 flex justify-between items-center p-6">
            <MenuIcon class="text-2xl" />
            <a class="font-bold text-2xl" href="/">divvy</a>
            <SettingsIcon class="text-2xl" />
        </nav>
    </header>
    <main class="w-full max-w-screen-xl mx-auto flex-1 flex flex-col p-6">
        {@render children()}
    </main>
    <footer class="w-full max-w-screen-xl mx-auto flex p-6">
        <div class="flex-1 flex flex-col items-center text-grape-lighter/50 dark:text-grape-lighter">
            <small>&copy; 2025 - Carlos R. Rodriguez</small>
            <div class="text-sm flex space-x-2 justify-center">
                <a class="underline" href="https://github.com/carlosrrdev/divvy-web">github</a>
                <a class="underline" href="/">tips</a>
            </div>
        </div>
    </footer>
</div>
<Toast />
