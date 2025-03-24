<script lang="ts">
  import { page } from '$app/state';
  import { pb, use } from '$lib/pocketbase.svelte';
  import dayjs from "dayjs";

  const account = use(() => pb.collection('accounts').getOne(page.params.id));
  const newsletters = use(() => pb.collection('newsletters').getFullList({
    filter: `account = "${page.params.id}"`
  }));

  async function createNew(){
    const data={
      "title": "Untitled",
      "author": "",
      "account": page.params.id,
      "published": false,
      "content": "#Accomplishments\n\n\n#Setbacks\n\n\n#Future Plans\n\n\n##Additional Notes\n\n\n"
    }
    const newNews = await pb.collection('newsletters').create(data)
    const id = newNews.id
    window.location.href=`/editor/${id}`
  }
  $inspect(newsletters);
  
  async function handleDelete(id:string){
    await pb.collection('newsletters').delete(id);
    location.reload()
  }


</script>


<div class="flex flex-col p-2 px-8 font-mono gap-4">
  <div class="flex justify-between">
    <div class="text-4xl">{account?.response?.name} <span class="font-bold">Newsletters</span></div>
    <button onclick={()=>{createNew()}} class="bg-emerald-400 p-2 rounded-md cursor-pointer">
      Create New
    </button>
  </div>

  {#if newsletters.response}
    {#each newsletters.response as newsletter, i}
      <div class="border rounded-md flex justify-between gap-4 p-4">
        <!-- Left side: Title and Author -->
        <div class="flex flex-col justify-between">
          <div class="text-2xl">{newsletter.title}</div>
          <div class="italic">Authored by {newsletter.author||"N/A"}</div>
        </div>


        <div class="flex gap-2">
          <div class="flex flex-col justify-between z-30">
            <a href="/editor/{newsletter.id}" class="text-amber-500">
              Edit
            </a>
            <button onclick={()=>{handleDelete(newsletter.id)}} class="text-rose-500">
              Delete
            </button>
          </div>
  
          <div class="flex flex-col justify-between border-l w-64 pl-8">
            <div class="">Updated: {dayjs(newsletter.updated).format("MM/DD/YYYY")}</div>
            {#if newsletter.published}  
              <div class="bg-emerald-300 w-fit px-2 rounded-md">Published</div>
            {:else}
              <div class="bg-rose-300 w-fit px-2 rounded-md">Not Published</div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
