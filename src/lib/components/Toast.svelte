<script lang="ts">
    import { toasts, type Toast } from '$lib/stores/toast';

    // Function to get the appropriate icon and background color based on toast type
    function getToastStyles(type: Toast['type']) {
        switch (type) {
            case 'success':
                return {
                    icon: '✓',
                    bgClass: 'toast-success'
                };
            case 'error':
                return {
                    icon: '✕',
                    bgClass: 'toast-error'
                };
            case 'warning':
                return {
                    icon: '⚠',
                    bgClass: 'toast-warning'
                };
            case 'info':
            default:
                return {
                    icon: 'ℹ',
                    bgClass: 'toast-info'
                };
        }
    }

    // Function to manually dismiss a toast
    function dismissToast(id: string) {
        toasts.remove(id);
    }
</script>

<div class="toast-container fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
    {#each $toasts as toast (toast.id)}
        <div 
            class="toast-item border rounded-sm p-3 shadow-md flex items-center gap-2 {getToastStyles(toast.type).bgClass}">
            <div class="toast-icon font-bold">{getToastStyles(toast.type).icon}</div>
            <div class="toast-message flex-1">{toast.message}</div>
            <button 
                class="toast-close ml-2 text-sm opacity-70 hover:opacity-100 cursor-pointer"
                on:click={() => dismissToast(toast.id)}
                aria-label="Dismiss toast"
            >
                ✕
            </button>
        </div>
    {/each}
</div>

<style>
    .toast-item {
        animation-name: toast-enter;
        animation-duration: 0.3s;
        animation-timing-function: cubic-bezier(.37,.04,.13,.99);
        animation-fill-mode: both;
    }

    @keyframes toast-enter {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>