<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';
    
    let showModal = false;
    
    function openModal() {
        showModal = true;
    }
</script>

<div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">Modal Focus Trap Test</h1>
    
    <p class="mb-4">This page tests the focus trapping functionality of the Modal component.</p>
    
    <div class="flex flex-col gap-4 mb-8">
        <button class="btn btn-primary w-40" on:click={openModal}>Open Modal</button>
        
        <a href="#" class="text-blue-500 hover:underline w-40">Focusable Link 1</a>
        
        <input type="text" placeholder="Focusable Input 1" class="border p-2 rounded w-60" />
        
        <button class="btn btn-secondary w-40">Another Button</button>
        
        <a href="#" class="text-blue-500 hover:underline w-40">Focusable Link 2</a>
        
        <input type="text" placeholder="Focusable Input 2" class="border p-2 rounded w-60" />
    </div>
    
    <div class="bg-gray-100 dark:bg-slate-700 p-4 rounded">
        <h2 class="font-bold mb-2">Testing Instructions:</h2>
        <ol class="list-decimal list-inside space-y-2">
            <li>Click the "Open Modal" button to open the modal</li>
            <li>Try tabbing through elements - focus should stay within the modal</li>
            <li>Press Escape to close the modal - focus should return to the "Open Modal" button</li>
            <li>Open the modal again and use the close button - focus should return to the "Open Modal" button</li>
        </ol>
    </div>
    
    <Modal bind:showing={showModal}>
        <svelte:fragment slot="header">
            <h2 class="text-xl font-bold">Focus Trap Test Modal</h2>
        </svelte:fragment>
        
        <div class="space-y-4">
            <p>This modal demonstrates focus trapping. Try tabbing through the elements below - focus should stay within the modal.</p>
            
            <input type="text" placeholder="Modal Input 1" class="border p-2 rounded w-full" />
            
            <button class="btn btn-primary w-full">Modal Button 1</button>
            
            <a href="#" class="text-blue-500 hover:underline block">Modal Link</a>
            
            <input type="text" placeholder="Modal Input 2" class="border p-2 rounded w-full" />
            
            <button class="btn btn-secondary w-full">Modal Button 2</button>
        </div>
        
        <svelte:fragment slot="footer">
            <button type="button" class="btn btn-primary-outline" on:click={() => showModal = false}>
                Cancel
            </button>
            <button type="button" class="btn btn-primary">
                Confirm
            </button>
        </svelte:fragment>
    </Modal>
</div>