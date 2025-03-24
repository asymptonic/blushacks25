<script lang="ts">
	import { pb, use } from '$lib/pocketbase.svelte';
	import { page } from '$app/state';
	import Transactions from '$lib/components/visualizations/Transactions.svelte';
	import Chart from '$lib/components/visualizations/Chart.svelte';
	import NumberFlow from '@number-flow/svelte';
	import { Button } from '$lib/components/ui/button';
	import { HandHeart, House } from 'lucide-svelte';
	import NewsletterViewer from './NewsletterViewer.svelte';

	const account = use(() => pb.collection('accounts').getOne(page.params.id));

	const transactions = use(() =>
		pb
			.collection('transactions')
			.getList(0, 100, { filter: `account="${page.params.id}"`, sort: '-timestamp' })
	);

	let hoveredValue = $state(0);
	let totalBalance = $state(0);

	let currentView: 'transactions' | 'news' = $state('transactions');
</script>

<div class="p-10">
	{#if account.response}
		<div class="mx-auto max-w-5xl">
				<div class="flex gap-4 items-center">
					<a href="/dashboard" class="mb-8"><House/></a>
					<h1 class="text-4xl font-bold mb-10">{account.response.name} Financials</h1>
				</div>

			<div class="grid gap-5" style="grid-template-columns: 2fr 1fr;">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="overflow-hidden rounded-2xl border p-5"
					onmouseleave={() => (hoveredValue = totalBalance)}
				>
					<Chart {transactions} bind:hoveredValue bind:totalBalance />
				</div>
				<div>
					<div class="h-full overflow-hidden rounded-2xl border p-5">
						<div>
							<p>Balance</p>
							<div class="w-fit text-left text-4xl font-bold">
								<NumberFlow
									value={hoveredValue}
									format={{
										style: 'currency',
										currency: 'USD',
										trailingZeroDisplay: 'stripIfInteger'
									}}
								/>
							</div>
						</div>

						<div class="mt-auto">
							<Button class="w-full rounded-2xl mt-5" href="/donate/{page.params.id}">
								Donate <HandHeart />
							</Button>

							<Button
								class="w-full rounded-2xl cursor-pointer mt-5"
								variant="outline"
								onclick={() => {
									currentView = currentView === 'news' ? 'transactions' : 'news';
								}}
							>
								{#if currentView === 'news'}
									View Transactions
								{:else}
									View Newsletters
								{/if}
							</Button>
						</div>
					</div>
				</div>
			</div>

      {#if account.response.description !== ''}
        <div class="p-10 text-neutral-400">{account.response.description}</div>
      {/if}

			<div class="mt-5 overflow-hidden rounded-xl border">
				{#if currentView === 'transactions'}
					<Transactions {transactions} />
				{:else if currentView === 'news'}
					<NewsletterViewer />
				{/if}
			</div>
		</div>
	{:else}
		loading...
	{/if}
</div>
