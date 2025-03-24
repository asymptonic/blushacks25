<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { pb } from '$lib/pocketbase.svelte';
	import { HandHeart } from 'lucide-svelte';

	async function oAuth() {
		await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}
</script>

<div class="grid h-screen place-items-center">
	<div class="flex gap-5">
		<div>
			<div class="rounded-full bg-emerald-500 p-5">
				<HandHeart color="white" size={36} />
			</div>
			<div class="px-5">
				<h1 class="mt-5 flex items-center gap-5 text-3xl font-bold">Open Bank</h1>
				<p class="mt-2 text-lg italic">A transparent way to run your non-profit</p>
			</div>
		</div>

		<div class="">
			<button class="aspect-square h-full items-center rounded-full border-5 shadow-md border-emerald-500 text-emerald-500 font-bold transition hover:-translate-y-1 hover:shadow-2xl cursor-pointer" onclick={oAuth}
				>Continue with<br />Google →</button
			>
		</div>
	</div>
</div>
