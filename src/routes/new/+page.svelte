<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';
    import type {Member, Expense, SplitDivvy} from "$lib/types";
    import {toasts} from "$lib/stores/toast";
    import TrashIcon from "$lib/components/TrashIcon.svelte";

    let expensesModalShowing = $state(false);
    let membersModalShowing = $state(false);
    let splitModalShowing = $state(false);
    let divvyUpModalShowing = $state(false);

    let expensesListShowing = $state(true);
    let membersListShowing = $state(false);

    let expenses: Array<Expense> = $state([]);
    let members: Array<Member> = $state([]);
    let splitResults: SplitDivvy = $derived({
        id: crypto.randomUUID(),
        total: 0,
        splitTotal: 0,
        expenses: expenses,
        members: members
    });

    let divvyTitle = $state('');
    let divvyTitleInput: HTMLInputElement;
    let expenseName = $state('');
    let expenseAmountString = $state('');
    let expenseNameInput: HTMLInputElement;

    let memberName = $state('');
    let memberNameInput: HTMLInputElement;

    $effect(() => {
        const total = Number(Math.round((expenses.reduce((acc, expense) => acc + expense.amount, 0)) * 100) / 100);
        const splitTotal = members.length > 0 ? Math.ceil(total / members.length * 100) / 100 : 0;
        splitResults = {...splitResults, total, splitTotal};
    })

    function handleSaveExpense(event: Event) {
        event.preventDefault();
        if (expenseName && expenseAmountString) {
            expenses.push({
                id: crypto.randomUUID(),
                title: expenseName,
                amount: parseFloat(expenseAmountString)
            });
            toasts.success(`${expenseName} added as expense`);
            expenseName = '';
            expenseAmountString = '';
            expenseNameInput.focus();
        }
    }

    function handleDeleteExpense(expenseId: string) {
        expenses = expenses.filter(expense => expense.id !== expenseId);
    }

    function handleSaveMember(event: Event) {
        event.preventDefault()
        if (memberName.trim()) {
            members.push({
                id: crypto.randomUUID(),
                name: memberName
            })
            toasts.success(`${memberName} added as member`);
            memberName = '';
            memberNameInput.focus();
        }
    }

    function handleDeleteMember(memberId: string) {
        members = members.filter(member => member.id !== memberId);
    }

    function verifyDivvyTitle(): boolean {
        if (divvyTitle.trim()) {
            return true;
        } else {
            toasts.error('Divvy title is required');
            divvyTitleInput.focus();
            divvyTitleInput.classList.add('border-rose-400');
            return false;
        }
    }

    function exportReport() {
        const reportText = getSplitReportText();
        const blob = new Blob([reportText], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${divvyTitle.trim()}_report.txt`;
        link.click();
        URL.revokeObjectURL(url);
    }

    function getSplitReportText(): string {
        const date = new Date();
        let reportText = `${divvyTitle.trim().toUpperCase()} REPORT\n`;
        reportText += date.toLocaleDateString() + " " + date.toLocaleTimeString() + "\n";
        reportText += "==================================================\n";
        reportText += `EXPENSES\n`;
        reportText += "+------------------------------------------------+\n";
        expenses.forEach(expense => {
            reportText += `${expense.title} - $${expense.amount}\n`;
        });
        reportText += `---- TOTAL: $${splitResults.total}\n`;
        reportText += "+------------------------------------------------+\n";
        reportText += `MEMBERS\n`;
        reportText += "+------------------------------------------------+\n";
        members.forEach(member => {
            reportText += `${member.name}\n`;
        });
        reportText += `---- SPLIT MEMBERS COUNT: ${splitResults.members.length}\n`;
        reportText += "+------------------------------------------------+\n";
        reportText += `---- SPLIT TOTAL PER MEMBER: $${splitResults.splitTotal}\n`;
        reportText += "==================================================\n";
        return reportText;
    }
</script>

<svelte:head>
    <title>Divvy | New Divvy</title>
</svelte:head>

<div class="flex-1 grid grid-rows-[auto_auto_1fr_auto] gap-y-4 lg:gap-y-12">
    <p class="font-bold text-lg">Creating new divvy</p>
    <form action="" class="flex flex-col gap-y-4">
        <fieldset class="flex flex-col gap-y-1">
            <label class="text-sm opacity-80" for="divvy-title">Title (required)</label>
            <input id="divvy-title" type="text" required placeholder="Untitled divvy" bind:value={divvyTitle}
                   bind:this={divvyTitleInput}>
        </fieldset>
        <div class="flex flex-col">
            <p class="font-bold text-lg">Add expenses and members</p>
            <small>&ast; 2 members &amp; 1 expense minimum to split evenly</small>
            <small>&ast; 2 members &amp; 2 expenses minimum to divvy up</small>
        </div>
        <div class="flex gap-x-2 lg:gap-x-8">
            <button type="button" onclick={() => expensesModalShowing = true} class="btn w-full btn-primary-outline">Add
                expenses
            </button>
            <button type="button" onclick={() => membersModalShowing = true} class="btn w-full btn-primary-outline">Add
                members
            </button>
        </div>
    </form>
    <div class="grid grid-rows-[auto_1fr] gap-y-1 border border-outline
    rounded-sm lg:hidden">
        <div class="grid grid-cols-[1fr_1px_1fr] border-b border-outline">
            <button onclick={() => {
                expensesListShowing = true;
                membersListShowing = false;
            }} class={`btn-toggle rounded-tl-sm ${expensesListShowing? "btn-toggle-active": ""}`}>Expenses
            </button>
            <div class="bg-grape"></div>
            <button onclick={() => {
                expensesListShowing = false;
                membersListShowing = true;
            }} class={`btn-toggle rounded-tr-sm ${membersListShowing? "btn-toggle-active": ""}`}>Members
            </button>
        </div>
        {#if expensesListShowing}
            <ul class="flex flex-col gap-y-2 overflow-y-auto">
                {#each expenses as expense, index (expense.id)}
                    <li class="list-item gap-x-2 items-center" style="animation-delay: {index * 0.1}s;">
                        <span class="text-sm">{expense.title}</span>
                        <span class="text-sm ml-auto">${expense.amount}</span>
                        <button onclick={() => handleDeleteExpense(expense.id)} class="ml-4 btn-trash">
                            <TrashIcon class="text-lg"/>
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
        {#if membersListShowing}
            <ul class="flex flex-col gap-y-2">
                {#each members as member, index (member.id)}
                    <li class="list-item justify-between gap-x-2 items-center" style="animation-delay: {index * 0.1}s;">
                        <span class="text-sm">{member.name}</span>
                        <button onclick={() => handleDeleteMember(member.id)} class="btn-trash">
                            <TrashIcon class="text-lg"/>
                        </button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="hidden lg:grid grid-cols-2 gap-x-8">
        <ul class="flex flex-col gap-y-2">
            {#each expenses as expense, index (expense.id)}
                <li class="list-item gap-x-2 items-center" style="animation-delay: {index * 0.1}s;">
                    <span class="text-sm">{expense.title}</span>
                    <span class="text-sm ml-auto">${expense.amount}</span>
                    <button onclick={() => handleDeleteExpense(expense.id)} class="ml-4 btn-trash">
                        <TrashIcon class="text-lg"/>
                    </button>
                </li>
            {/each}
        </ul>
        <ul class="flex flex-col gap-y-2">
            {#each members as member, index (member.id)}
                <li class="list-item justify-between gap-x-2 items-center" style="animation-delay: {index * 0.1}s;">
                    <span class="text-sm">{member.name}</span>
                    <button onclick={() => handleDeleteMember(member.id)} class="btn-trash">
                        <TrashIcon class="text-lg"/>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
    <div class="flex gap-x-2 lg:gap-x-8">
        <button onclick={() => verifyDivvyTitle()? splitModalShowing = true : splitModalShowing = false}
                disabled={expenses.length < 1 || members.length <=1}
                class="btn btn-primary flex-1">Split evenly
        </button>
        <button onclick={() => verifyDivvyTitle()? divvyUpModalShowing = true : divvyUpModalShowing = false}
                disabled={expenses.length <=1 || members.length <=1}
                class="btn btn-primary flex-1">Divvy up
        </button>
    </div>
</div>

<Modal bind:showing={expensesModalShowing}>
    {#snippet header()}
        <h2 class="text-xl font-bold">Add Expenses</h2>
    {/snippet}
    {#snippet content()}
        <div class="flex flex-col gap-y-4">
            <form class="flex flex-col gap-y-4" onsubmit={handleSaveExpense}>
                <fieldset class="flex flex-col gap-y-1">
                    <label class="text-sm opacity-80" for="expense-name">Expense name</label>
                    <input type="text" id="expense-name" bind:value={expenseName} bind:this={expenseNameInput} required
                           placeholder="Enter expense name">
                </fieldset>
                <fieldset class="flex flex-col gap-y-1">
                    <label class="text-sm opacity-80" for="expense-amount">Expense amount</label>
                    <input type="number" id="expense-amount" bind:value={expenseAmountString} step="0.01" required
                           placeholder="Enter expense amount">
                </fieldset>
                <button type="submit" class="btn btn-primary">Save Expenses</button>
            </form>
        </div>
    {/snippet}
</Modal>

<Modal bind:showing={membersModalShowing}>
    {#snippet header()}
        <h2 class="text-xl font-bold">Add Members</h2>
    {/snippet}
    {#snippet content()}
        <div class="flex flex-col gap-y-4">
            <form class="flex flex-col gap-y-4" onsubmit={handleSaveMember}>
                <fieldset class="flex flex-col gap-y-1">
                    <label class="text-sm opacity-80" for="member-name">Member name</label>
                    <input type="text" id="member-name" bind:value={memberName} bind:this={memberNameInput} required
                           placeholder="Enter member name">
                </fieldset>
                <button type="submit" class="btn btn-primary">Save member</button>
            </form>
        </div>
    {/snippet}
</Modal>

<Modal bind:showing={splitModalShowing}>
    {#snippet header()}
        <h2 class="text-xl font-bold">Split Evenly</h2>
    {/snippet}
    {#snippet content()}
        <div class="flex flex-col gap-y-4">
            <small>Final report</small>
            <div>
                <p class="text-lime text-7xl tracking-tight">${splitResults.splitTotal}</p>
                <small>Expenses total: ${splitResults.total} / Total members: {splitResults.members.length}</small>
            </div>
        </div>
    {/snippet}
    {#snippet footer()}
        <div class="mt-8 grid grid-cols-2 gap-x-4">
            <button onclick={() => exportReport()} class="btn btn-primary-outline">Download results</button>
            <button class="btn btn-primary">Save results</button>
        </div>
    {/snippet}
</Modal>