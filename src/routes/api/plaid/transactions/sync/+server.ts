import { PLAID_ACCESS_TOKEN } from '$env/static/private';
import { pb } from '$lib/pocketbase.svelte.js';
import { plaid } from '$lib/server/plaid.js';
import type { TransactionsRecord } from '$lib/types/db.js';
import { json } from '@sveltejs/kit';

export async function POST({}) {
	const data = await plaid.transactionsSync({
		access_token: PLAID_ACCESS_TOKEN,
		cursor: '',
		count: 500
	});
	// const data = await plaid.accountsGet({access_token: PLAID_ACCESS_TOKEN});

	const batch = pb.createBatch();

	// let i=0;

	for (const transaction of data.data.added) {
		// console.log(i);
		// i++;

		batch.collection('transactions').create({
			transaction_id: transaction.transaction_id,
			account: 'k502mv28k1mr6t6',
			title: 'innit',
			amount: transaction.amount,
			category: transaction.category?.join(','),
			merchant_name: transaction.merchant_name || '',
			logo_url: transaction.logo_url || '',
			website: transaction.website || '',
			timestamp: transaction.authorized_date || ''
		} satisfies Omit<TransactionsRecord, 'id'>);
	}

	const response = await batch.send();

	return json(data.data);
}
