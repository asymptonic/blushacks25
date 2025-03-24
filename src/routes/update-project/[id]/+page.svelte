<script lang="ts">
    import { House } from 'lucide-svelte';

  import { page } from '$app/state';

  import { pb, use, user } from '$lib/pocketbase.svelte';

  const account = use(() => pb.collection('accounts').getOne(page.params.id));

  $effect(() => {
    name = account.response?.name;
    goals = account.response?.goal;
    description = account.response?.description;
  });

  let name:string = $state("");
  let goals:number = $state(0);
  let description:string = $state("");

  async function handleComplete(){
    const data = {
        "name": name,
        "description": description,
        "goal": goals
    };

    const record = await pb.collection('accounts').update(page.params.id, data);
    window.location.href = `/project/${record.id}`;
  }
</script>

<div class="grid grid-cols-2">
  <div class="flex flex-col p-8 font-mono gap-4 w-full shadow-xl pr-12">
    <div class="flex gap-4 items-center">
      <a href="/dashboard"><House/></a>
      <div class="text-3xl">Project Configuration</div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <div class="font-bold min-w-32">
          Project Name:
        </div>
        <input bind:value={name} placeholder="Acme inc." class="border-b-2 outline-none w-full"/>
      </div>
      <div class="flex gap-2 items-center">
        <div class="font-bold min-w-32">
          Bank Account:
        </div>
        <div class="border-b-2 outline-none w-full italic text-stone-600 cursor-not-allowed">Demo Account (since this is a hackathon)</div>
      </div>
      <div class="flex gap-2 items-center">
        <div class="font-bold min-w-48">
          Fundraising Goals:
        </div>
        <input type="number" bind:value={goals} placeholder="How much money do you need!" class="border-b-2 outline-none w-full"/>
      </div>
      <div class="flex-col gap-2 items-center">
        <div class="font-bold">
          Description:
        </div>
        <textarea bind:value={description} placeholder="A brief description on what you do!" class="w-full h-24 border outline-none rounded-md shadow-md focus:shadow-lg transition-all duration-300 ease-in-out p-2"></textarea>
      </div>
    </div>

    <button onclick={()=>{handleComplete()}} class="w-full bg-emerald-400 p-2 mt-32 rounded-md hover:bg-emerald-500 active:scale-95 transition-all duration-300 ease-in-out">
      Create Project
    </button>
  </div>
  <div class="h-screen w-full animate-gradient grid place-items-center">
    <div class='text-white'>
      "A wise person should have money in their head, but not in their heart."<br/>
      <span class="ml-6">- Johnathan Swift<span>
    </div>
  </div>
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradient {
    background: linear-gradient(-45deg, oklch(0.845 0.143 164.978), oklch(0.508 0.118 165.612));
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    height: 100vh;
  }
</style>
