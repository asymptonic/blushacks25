<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { CreditCard, HandHeart } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { pb, use } from '$lib/pocketbase.svelte';
	import { page } from '$app/state';
	import type { TransactionsResponse } from '$lib/types/db';
	import type { ListResult } from 'pocketbase';

	const {
		transactions
	}: {
		transactions: {
			response: ListResult<TransactionsResponse<unknown>> | null;
		};
	} = $props();
</script>

<Table.Root class='relative'>
	<Table.Header class="sticky top-0 bg-white">
		<Table.Row>
			<Table.Head class="w-[60px]"></Table.Head>
			<Table.Head class="w-[120px]">Date</Table.Head>
			<Table.Head class="">Description</Table.Head>
			<Table.Head class="w-[150px]">Merchant</Table.Head>
			<Table.Head class="text-right">Amount</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if transactions?.response}
			{#each transactions.response.items as transaction}
				<Table.Row
					class={[
						'border-r-4',
						transaction.amount < 0 ? 'border-r-emerald-500' : 'border-r-red-500'
					]}
				>
					<Table.Cell>
						{#if transaction.type === 'donation'}
							<HandHeart />
						{:else if transaction.logo_url}
							<img
								class="h-6 w-6 shrink-0 overflow-hidden rounded-full"
								src={transaction.logo_url}
								alt="{transaction.merchant_name} logo"
							/>
						{:else}
							<CreditCard />
						{/if}
					</Table.Cell>
					<Table.Cell>
						{transaction.timestamp.substring(0, 10)}
					</Table.Cell>

					<Table.Cell
						class={[
							'border-l-4',
							transaction.amount < 0 ? 'border-x-emerald-500' : 'border-x-red-500'
						]}
					>
						{transaction.description ? transaction.description : transaction.title}
					</Table.Cell>

					<Table.Cell>
						{transaction.merchant_name}
					</Table.Cell>

					<Table.Cell
						class={[
							'border-r-8 text-right font-bold',
							transaction.amount < 0 ? 'text-emerald-500' : 'text-red-500'
						]}
					>
						{#if transaction.amount < 0}
							+
						{:else}
							-
						{/if}
						${Math.abs(transaction.amount).toFixed(2)} USD
					</Table.Cell>
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>
