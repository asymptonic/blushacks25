<script lang="ts">
	import { House } from 'lucide-svelte';
	import NumberFlow from '@number-flow/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { pb, use } from '$lib/pocketbase.svelte';
	import Chart from '$lib/components/visualizations/Chart.svelte';
	import Transactions from '$lib/components/visualizations/Transactions.svelte';

	const account = use(() => pb.collection('accounts').getOne(page.params.id));

	const transactions = use(() =>
		pb
			.collection('transactions')
			.getList(0, 100, { filter: `account="${page.params.id}"`, sort: '-timestamp' })
	);

	onMount(() => {
		// balance = 523.0;
		// spending = 214;
		// funding = 7504;
	});

	let spending: number = $derived.by(() => {
		let total = 0;

		if (transactions.response?.items) {
			transactions.response.items.forEach((i) => (total += i.amount > 0 ? i.amount : 0));
		}
		return total;
	});
	let funding: number = $derived.by(() => {
		let total = 0;

		if (transactions.response?.items) {
			transactions.response.items.forEach((i) => (total -= i.amount < 0 ? i.amount : 0));
		}
		return total;
	});
	let fundraising_progress: number = $derived((funding / (account.response?.goal || 1)) * 100);

	let hoveredValue = $state(0);
	let totalBalance = $state(0);
</script>

<div class="flex h-screen w-full flex-col gap-4 overflow-hidden p-2">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-4">
			<a href="/dashboard"><House /></a>
			<div class="text-3xl">{account?.response?.name}</div>
		</div>
		<a href="/update-project/{page.params.id}" class=""> Settings </a>
	</div>
	<div class="flex justify-between gap-4 font-medium">
		<div class="flex h-24 w-full flex-col items-center rounded-md border p-2 shadow-md">
			<div>Current Balance</div>
			<div class="grid flex-grow place-items-center text-4xl">
				<NumberFlow value={hoveredValue} format={{ style: 'currency', currency: 'USD' }} />
			</div>
		</div>
		<div class="flex h-24 w-full flex-col items-center rounded-md border p-2 shadow-md">
			<div>Current Expenses</div>
			<div class="flex flex-grow place-items-center text-4xl">
				<NumberFlow value={spending} format={{ style: 'currency', currency: 'USD' }} />
			</div>
		</div>
		<div class="flex h-24 w-full flex-col items-center rounded-md border p-2 shadow-md">
			<div>Current Funds Raised</div>
			<div class="flex flex-grow place-items-baseline text-4xl">
				<NumberFlow value={funding} format={{ style: 'currency', currency: 'USD' }} />
				<div class="text-sm">
					/${account.response?.goal}
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-between gap-4">
		<div
			class="flex-grow rounded-md border p-2 shadow-md"
			onmouseleave={() => {
				hoveredValue = totalBalance;
			}}
		>
			<Chart bind:totalBalance bind:hoveredValue {transactions} />
		</div>

		<div>
			<div class="flex w-80 flex-col gap-4 rounded-md border p-2 shadow-md">
				<div class="-mb-4 text-lg font-bold">Milestones</div>
				<div class="flex flex-col">
					<div class="flex justify-between">
						<div>Make Website</div>
						<div>03/28</div>
					</div>
					<div class="flex w-full">
						<div class="h-2 w-full bg-emerald-400" style="width: {fundraising_progress}%"></div>
						<div class="h-2 w-full flex-grow bg-stone-200"></div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="flex justify-between">
						<div>Make Website</div>
						<div>03/28</div>
					</div>
					<div class="flex w-full">
						<div class="h-2 w-full bg-emerald-400" style="width: {fundraising_progress}%"></div>
						<div class="h-2 w-full flex-grow bg-stone-200"></div>
					</div>
				</div>
			</div>
			<a
				href="/newsletters/{account?.response?.id}"
				class="mt-5 flex w-80 flex-col gap-4 rounded-md border p-2 shadow-md"
			>
				<div class="ext-lg font-bold">Newsletter →</div>
			</a>
		</div>

		<div class="flex h-full w-12 flex-col rounded-md border p-2 shadow-md">
			<div class="w-full flex-grow bg-stone-200"></div>
			<div class="w-full bg-green-500" style="height: {fundraising_progress}%"></div>
		</div>
	</div>

	<Transactions {transactions} />
</div>

<style>
	/* Custom scrollbar styles */
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 8px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #cbd5e0; /* Tailwind's gray-300 */
		border-radius: 8px;
	}
	/* For Firefox */
	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: #cbd5e0 transparent;
	}
</style>
