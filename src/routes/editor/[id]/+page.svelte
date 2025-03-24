<script lang="ts">
  import { page } from '$app/state';
  import { pb, use } from '$lib/pocketbase.svelte';
  import dayjs from "dayjs";

  const article = use(() => pb.collection('newsletters').getOne(page.params.id));
  console.log(page.params.id);


  $effect(() => {
    title = article.response?.title;
    author = article.response?.author;
    text = article.response?.content;
  });
  
  let title: string = $state("");
  let author: string = $state("");
  let text: string = $state("");

  async function handleSave() {
    const data = {
      "title": title,
      "author": author,
      "published": false,
      "content": text
    };
    const record = await pb.collection('newsletters').update(page.params.id, data);
  }
  async function handlePublish(action: boolean) {
    const data = {
      "title": title,
      "author": author,
      "published": action,
      "content": text
    };
    const record = await pb.collection('newsletters').update(page.params.id, data);
  }
</script>

<div class="flex flex-col p-2 px-8 font-mono gap-4">
  <div class="flex items-baseline gap-4">
    <button class="bg-stone-200 p-2 rounded-md" onclick={()=>{window.history.back();}}>
      Back
    </button>
    <div>Title:</div>
    <input
      bind:value={title}
      placeholder="Untitled Newsletter"
      class="outline-none border-b-2 text-2xl w-full"
    />
    <div class="ml-4">Author:</div>
    <input
      bind:value={author}
      placeholder="Jane Doe"
      class="outline-none border-b-2 text-2xl"
    />
    <button onclick={()=>{handleSave()}} class="bg-stone-200 p-2 rounded-md">Update</button>
    {#if article.response?.published}
      <button onclick={()=>{handlePublish(false)}} class="bg-red-400 p-2 rounded-md">Unpublish</button>
    {:else}
      <button onclick={()=>{handlePublish(true)}} class="bg-green-500 p-2 rounded-md">Publish</button>
    {/if}
  </div>
  <textarea
    bind:value={text}
    class="border shadow-md rounded-md h-[40rem] w-full p-2 relative outline-none focus:shadow-xl transition-all duration-300 ease-in-out"
    placeholder="Enter your newsletter in markdown here..."
  >
  </textarea>
</div>
