<script lang="ts">
  
  import { pb, user, use, userRefresh } from "$lib/pocketbase.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";

  
  // console.log("not user")
  const records = use(() => pb.collection('accounts').getFullList());
  
  onMount(async () => {
    userRefresh()
  })

  console.log("records")
  $inspect(records)

  let search:string = $state("")
</script>

<div class="h-screen p-8 flex flex-col">
  <div class="w-full text-center">
    Welcome back, {user?.record?.name}
  </div>
  <div class="flex flex-col gap-12">
    <div>
      <div class="font-bold text-2xl">
        Owned Projects
      </div>
      <div class="flex gap-4">
        {#if records.response}
          {#each records.response as record, i}
            {#if record.users.includes(user?.record?.id||"")}
              <a href="/project/{record.id}"
               class="w-92 h-52 border shadow-md rounded-md p-8">
               <div class="flex flex-col justify-between h-full">
                <div class="flex justify-between">
                  <div class='font-bold text-2xl'>
                    {record.name}
                  </div>
                  <div class="">
                    Goal: {record.goal}
                  </div>

                </div>
                <div class="text-sm">
                  {record.description}
                </div>
              </div>
              </a>
            {/if}
          {/each}
        {/if}
        <a href="/create-project" class="w-80 h-52 border shadow-md rounded-md grid place-items-center text-5xl text-stone-300">+</a>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <div class="font-bold text-2xl min-w-52">
          View and Donate
        </div>
        <form class="flex place-items-center gap-4 w-full bg-slate-200 rounded-full h-12 px-4">
          <!-- <Search/> -->
          <input bind:value={search} class="w-full text-sm h-12 focus:outline-none" placeholder="Search for a club here" />
          {#if search}
            <button onclick={()=>{search=""}} transition:fly={{ duration: 250, delay:0, x:20, y:0, easing:quintInOut}} class="bg-slate-300 h-8 px-2 rounded-full" >
              Clear
            </button>
          {/if}
        </form>
      </div>

      <div>
        <div class="grid gap-6 auto-rows-fr" style="grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));">
          {#if records.response}
            {#each records.response as record}
              {#if (record.name).toLowerCase().includes(search)}
                <a href="/public/{record.id}" class="w-full cursor-pointer h-64 border shadow-md rounded-md p-8 hover:shadow-xl transition-all duration-300 ease-in-out">
                  <div class="flex flex-col justify-between h-full">
                    <div class="flex justify-between">
                      <div class='font-bold text-2xl'>
                        {record.name}
                      </div>
                      <div class="">
                        Goal: {record.goal}
                      </div>

                    </div>
                    <div class="text-sm">
                      {record.description}
                    </div>
                  </div>
                </a>
              {/if}
            {/each}
          {/if}
        </div>
      </div>

      
    </div>
      
  </div>

  

</div>

