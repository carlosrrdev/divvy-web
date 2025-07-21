<script lang="ts">
    let {showing = $bindable(), header, content} = $props();

    let modalElement: HTMLElement | undefined = $state();
    let previouslyFocusedElement: HTMLElement | null = null;
    let focusableElements: HTMLElement[] = [];

    import {onMount} from 'svelte';

    // Store the element that had focus before the modal opened
    onMount(() => {
        if (typeof document !== 'undefined') {
            previouslyFocusedElement = document.activeElement as HTMLElement;
        }
    });

    // This effect runs whenever showing or modalElement changes
    $effect(() => {
        if (showing && modalElement) {
            // Get all focusable elements within the modal
            focusableElements = Array.from(
                modalElement.querySelectorAll(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ) as HTMLElement[];

            // Focus the first focusable element in the modal
            if (focusableElements.length > 0) {
                setTimeout(() => {
                    focusableElements[0].focus();
                }, 50);
            } else {
                // If no focusable elements, focus the modal itself
                modalElement.focus();
            }
        } else if (!showing && previouslyFocusedElement) {
            // Return focus to the previously focused element when the modal closes
            previouslyFocusedElement.focus();
        }
    });

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

        // Only handle Tab key events when the modal is open
        if (showing && event.key === 'Tab') {
            // If there are no focusable elements, do nothing
            if (focusableElements.length === 0) return;

            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            // If shift + tab and focus is on first element, move to last element
            if (event.shiftKey && document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
            // If tab and focus is on last element, move to first element
            else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }
</script>

<style>
    .modal-body {
        animation: modal-fade-in 350ms cubic-bezier(.31, .02, .08, .96);
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

<!--<svelte:window on:keydown={handleKeyDown}/>-->

{#if showing}
    <div
            class="fixed inset-0 bg-stone-700/50 dark:bg-neutral-950/70 flex items-center p-6 justify-center z-40"
            onclick={handleBackdropClick}
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            bind:this={modalElement}
            onkeydown={handleKeyDown}
    >
        <div class="modal-body p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div class="flex justify-between items-center mb-4">
                {@render header()}
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
                {@render content()}
            </div>
            <div class="mt-6 flex justify-end gap-2">
                <button
                        type="button"
                        class="btn btn-primary-outline"
                        onclick={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}