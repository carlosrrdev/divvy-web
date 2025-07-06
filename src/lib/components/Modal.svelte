<script lang="ts">
    export let showing = false;

    function closeModal() {
        showing = false;
    }

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
</script>

<style>
    .modal-body {
        animation: modal-fade-in 350ms cubic-bezier(.31,.02,.08,.96);
    }

    @keyframes modal-fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

<svelte:window on:keydown={handleKeyDown}/>

{#if showing}
    <div
            class="fixed inset-0 bg-black/40 dark:bg-neutral-900/60 flex items-center p-6 justify-center z-50"
            onclick={handleBackdropClick} onkeydown={(e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        }} tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
        <div class="modal-body bg-neutral-100 dark:bg-neutral-950 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <slot name="header">
                    <h2 class="text-xl font-bold">Modal Title</h2>
                </slot>
                <button
                        type="button"
                        class="text-gray-500 hover:text-rose-400 cursor-pointer"
                        onclick={closeModal}
                        aria-label="Close modal"
                >
                    ✕
                </button>
            </div>
            <div class="modal-content">
                <slot/>
            </div>
            <div class="mt-6 flex justify-end gap-2">
                <slot name="footer">
                    <button
                            type="button"
                            class="btn btn-primary-outline"
                            onclick={closeModal}
                    >
                        Close
                    </button>
                </slot>
            </div>
        </div>
    </div>
{/if}