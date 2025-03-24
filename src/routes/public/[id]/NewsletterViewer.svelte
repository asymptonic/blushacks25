<script lang="ts">
	import { page } from '$app/state';
	import { pb, use } from '$lib/pocketbase.svelte';
	import type { NewslettersResponse, UsersResponse } from '$lib/types/db';
	import dayjs from 'dayjs';
	import { ArrowLeft, Divide } from 'lucide-svelte';
	import { marked } from 'marked';

	const newsletters = use(() =>
		pb
			.collection('newsletters')
			.getFullList<
				NewslettersResponse<{ author: UsersResponse }>
			>({ filter: `account = "${page.params.id}"`, expand: 'author' })
	);

	let selectedNewsletter = $state('');
</script>

{#if selectedNewsletter === ''}
	<h2 class="text-bold p-10 pb-0 font-serif text-2xl italic">Newsletters</h2>
{/if}

{#if !newsletters.response}
	<!-- loading... -->
{:else}
	<div class="p-10">
		{#if selectedNewsletter === ''}
			<ul class="flex flex-col gap-10">
				{#each newsletters.response as newsletter}
					<li>
						<button
							class="group flex cursor-pointer items-center"
							onclick={() => (selectedNewsletter = newsletter.id)}
						>
							<div class="w-30 border-r pr-5 text-right text-neutral-400">
								{dayjs(newsletter.updated).format('DD/MM/YYYY')}
							</div>
							<div class="flex gap-5 pl-5">
								<div class="font-bold group-hover:underline">
									{newsletter.title}
								</div>
							</div>

							<div class="flex items-center gap-3 pl-10">
								{#if newsletter.expand?.author}
									{#if newsletter.expand.author.avatar}
										<img
											class="h-8 w-8 rounded-full"
											src={pb.files.getURL(
												newsletter.expand.author,
												newsletter.expand.author.avatar
											)}
											alt="avatar"
										/>
									{/if}
									<div>{newsletter.expand.author.name}</div>
								{/if}
							</div>
						</button>
					</li>
					<hr />
				{/each}
			</ul>
		{:else}
			{@const newsletter = newsletters.response.find((n) => n.id === selectedNewsletter)!}

			<button
				class="flex cursor-pointer items-center gap-3 text-neutral-500 hover:underline"
				onclick={() => {
					selectedNewsletter = '';
				}}
			>
				<ArrowLeft size={16} />
				Return
			</button>

			<div class="my-10">
				<h1 class="font-serif text-3xl font-bold italic">{newsletter.title}</h1>
				<div class="flex items-center gap-3 pt-5">
					{#if newsletter.expand?.author}
						{#if newsletter.expand.author.avatar}
							<img
								class="h-8 w-8 rounded-full"
								src={pb.files.getURL(newsletter.expand.author, newsletter.expand.author.avatar)}
								alt="avatar"
							/>
						{/if}
						<div>{newsletter.expand.author.name}</div>
					{/if}
				</div>
			</div>

			<hr class="mt-5 mb-10" />

			<div class="prose">
				{@html marked(newsletter.content)}
			</div>
		{/if}
	</div>
{/if}
