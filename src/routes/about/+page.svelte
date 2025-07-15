<script lang="ts">
    import {onMount} from "svelte";
    import mermaid from 'mermaid';

    let diagram1: string = `
      graph TD
        A([Expense 1]) --> D
        B([Expense 2]) --> D
        C([Expense 3]) --> D

        D{{<strong>Split evenly</strong> <br/> <pre>Total expenses/Total members</pre>}}

        D --> G([Member 1])
        D --> H([Member 2])
        D --> I([Member 3])
        D --> J([Member 4])
        D --> K([Member 5])
    `;

    let diagram2: string = `
    graph LR
    %% Expenses
    E1([Expense 1]) --> ED1
    E2([Expense 2]) --> ED2
    E3([Expense 3]) --> ED3

    %% Distribution nodes
    ED1{{Expense 1 Distribution}}
    ED2{{Expense 2 Distribution}}
    ED3{{Expense 3 Distribution}}

    %% Members
    M1([Member 1])
    M2([Member 2])
    M3([Member 3])
    M4([Member 4])
    M5([Member 5])

    %% Expense 1 Distribution
    ED1 --> M1
    ED1 --> M3
    ED1 --> M5
    ED1 --> M4

    %% Expense 2 Distribution
    ED2 --> M4

    %% Expense 3 Distribution
    ED3 --> M2
    ED3 --> M4
`;

    let diagramContainer1;
    let diagramContainer2;

    async function renderDiagram(diagram: string, container, id: string) {
        const {svg} = await mermaid.render(id, diagram);
        container!.innerHTML = svg;
    }

    onMount(async () => {
        mermaid.initialize({ startOnLoad: false, theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'neutral' });
        await renderDiagram(diagram1, diagramContainer1, 'mermaid-diagram1');
        await renderDiagram(diagram2, diagramContainer2, 'mermaid-diagram2');
    })
</script>
<div class="py-12 flex flex-col gap-y-8">
    <h1 class="font-bold text-[clamp(2rem,5vw,3.5rem)]">About Divvy</h1>
    <div class="max-w-screen-lg flex flex-col gap-y-8">
        <p class="leading-relaxed">
            Divvy is a, quite simply, an expense splitting application. However. There are a few key features
            that make Divvy stand out. Let's go over them now.
        </p>
        <section>
            <h2 class="font-bold text-[clamp(1rem,5vw,1.5rem)] text-amber-500">Split or Divvy up</h2>
            <p class="leading-relaxed">
                It is very easy to tally up expenses and divide them up equally between a specific number of people.
                Indeed, Divvy excels at this task. However, the true power of Divvy comes when you decide to
                <em>Divvy up</em> expenses. This means that specifically assign expenses to each member and Divvy will
                handle the rest. Intelligently calculating expenses based on the number of people assigned to each.
            </p>
            <div class="mt-8" bind:this={diagramContainer1}></div>
            <hr class="my-8 opacity-20" />
            <div class="mt-8" bind:this={diagramContainer2}></div>
        </section>
        <section>
            <h2 class="font-bold text-[clamp(1rem,5vw,1.5rem)] text-amber-500">Reports and Data</h2>
            <p class="leading-relaxed">
                Divvy will generate a report for each of your Divvy's and present the data clean and easy to understand
                format. Whether you're just simply splitting expenses equally or Divvying up expenses, Divvy will always
                generate a report that you can then save and open at any time.
            </p>
        </section>
        <section>
            <h2 class="font-bold text-[clamp(1rem,5vw,1.5rem)] text-amber-500">Local vs Cloud</h2>
            <p class="leading-relaxed">
                As mentioned previously, your reports can be saved and opened at any time. How you choose to save your
                reports is up to you. If you are not signed in, Divvy will store your reports locally on your device by
                default. This of course means that you can use Divvy without needing to create an account. However,
                there are some caveats to this.
            </p>
            <p class="mt-8">Firstly, reports saved locally are tied to the device you used at the time you saved the
                report. This
                means that if you saved the report while using your phone you will <strong>not</strong> see that report
                on
                any other device expect for your phone. This logic also applied to the browser you used to save the
                report.
                Reports saved on Google Chrome will not show up on Microsoft Edge for example.
            </p>
            <p class="mt-8">
                If having access to your reports across devices and browsers is important to you, consider creating a
                free account to have all your reports saved in the Cloud and available across all devices and browsers.
            </p>
        </section>
        <section>
            <h2 class="font-bold text-[clamp(1rem,5vw,1.5rem)] text-amber-500">Meet the Divvy Family</h2>
            <p class="leading-relaxed">
                The Divvy you see now is only one member of the Divvy family!
                <a class="underline text-teal-500" href="https://github.com/carlosrrdev/divvy-cli">divvy-cli</a>
                brings Divvy to your terminal! And if you prefer a graphical interface, then
                <a class="underline text-teal-500" href="https://github.com/carlosrrdev/divvy-gui">divvy-gui</a> is
                the perfect choice for you.
            </p>
        </section>
        <em>
            Divvy is free and open source and relies on the support of the community. If you would like to contribute to
            any of the Divvy products, please see the github links. Donations are highly appreciated and help with the
            upkeep costs.
        </em>
    </div>
</div>
