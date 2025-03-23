<script lang="ts">
	import { pb, use } from '$lib/pocketbase.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { page } from '$app/state';

	const account = use(() => pb.collection('accounts').getOne(page.params.id));
	const transactions = use(() =>
		pb.collection('transactions').getList(0, 25, { filter: `account="${page.params.id}"` })
	);

  $inspect(account)
</script>

<div>
	{#if account.response}
		<div>
			<h1 class="font-bold text-2xl">{account.response.name}</h1>
		</div>

		<Table.Root>
			<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
			<Table.Header>
				<Table.Row>
					<!-- <Table.Head class="w-[100px]">Description</Table.Head> -->
					<Table.Head class="">Description</Table.Head>
					<Table.Head>Amount</Table.Head>
					<!-- <Table.Head>Method</Table.Head>
      <Table.Head class="text-right">Amount</Table.Head> -->
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if transactions?.response}
					{#each transactions.response.items as transaction}
						<Table.Row>
							<!-- <Table.Cell class="font-medium">INV001</Table.Cell> -->
							<Table.Cell
								>{transaction.description ? transaction.description : transaction.title}</Table.Cell
							>
							<!-- <Table.Cell>Credit Card</Table.Cell> -->
							<Table.Cell class="text-right font-medium">
								{#if transaction.amount < 0}
									-
								{/if}

								${Math.abs(transaction.amount).toFixed(2)}
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	{:else}
		loading...
	{/if}
</div>
