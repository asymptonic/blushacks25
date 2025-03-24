<script lang="ts">
	import { pb, use } from '$lib/pocketbase.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import toast, { Toaster } from 'svelte-french-toast';
	import { HandHeart } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let id = page.params.id;
	let name = $state('');
	let amount = $state(0);

	let submitted = $state(false);

	async function handleDonation(name: string, amount: number) {
		if (name === '') {
			toast.error('Please enter your name');
			return;
		}

		const data = {
			title: 'Donation from ' + name,
			amount: -amount,
			type: 'donation',
			timestamp: new Date().toISOString(),
			account: id
		};
		try {
			submitted = true;
			const res = await pb.collection('transactions').create(data);
			toast.success('Donation successful. Redirecting...');

			setTimeout(() => goto(`/public/${page.params.id}`), 2500);
		} catch (e) {
			submitted = false;
			console.log(e);
			toast.error('Donation failed with error: ' + e);
		}
	}

	let account = use(() => pb.collection('accounts').getOne(page.params.id));
</script>

<div class="grid h-screen w-full" style="grid-template-columns: 1fr 1fr;">
	<div class="grid place-items-center">
		<form
			class="w-96"
			on:submit={(e) => {
				e.preventDefault();
				handleDonation(name, amount);
			}}
		>
			<h1 class="flex items-center gap-5 text-2xl font-bold">
				<HandHeart size={36} /> Donate{account.response ? ` to ${account.response.name}` : ''}
			</h1>
			<div class="mt-5">
				<Label class="font-bold" for="">Amount</Label>
				<Input
					class="w-full"
					bind:value={amount}
					type="number"
					placeholder="Amount"
					min={1}
					max={1000}
				/>
			</div>
			<div class="mt-5">
				<Label class="font-bold" for="">Your Name</Label>
				<Input class="w-full" bind:value={name} type="text" placeholder="Jane Doe" />
			</div>

			<Button disabled={submitted} class="mt-5 w-full cursor-pointer" type="submit">Donate</Button>
		</form>
	</div>

	<div
		class="h-full w-full overflow-hidden bg-cover"
		style="background-image: url(https://images.unsplash.com/photo-1536147116438-62679a5e01f2?q=80);"
	></div>
</div>
