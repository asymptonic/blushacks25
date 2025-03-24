<script lang="ts">
  import { House } from 'lucide-svelte';
  import { pb, use, user } from '$lib/pocketbase.svelte';

  let name:string = $state("");
  let goals:number = $state(0);
  let description:string = $state("");
  let tempuser:string = $state("");
  let users:any[] = $state([user.record]);
  let userids:string[] = $state([user.record?.id||""])

  async function handleSubmit(){
    console.log(tempuser);
    const record = await pb.collection('users').getFirstListItem(`name ~ "${tempuser}"`);

    if (!userids.includes(record.id)){
      users = [...users, record]
      userids = [...userids, record.id]
    } else {
      console.log("already in list")
    }
  }

  async function handleComplete(){
    const data = {
        "name": name,
        "description": description,
        "users": userids,
        "goal": goals
    };

    const record = await pb.collection('accounts').create(data);

    window.location.href = `/project/${record.id}`;
  }
</script>

<div class="grid grid-cols-2">
  <div class="flex flex-col p-8 font-mono gap-4 w-full shadow-xl pr-12">
    <div class="flex gap-4 items-center">
      <a href="/dashboard"><House/></a>
      <div class="text-3xl">Project Creation</div>
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
        <div class="border-b-2 outline-none w-full italic text-stone-600  cursor-not-allowed">Demo Account (since this is a hackathon)</div>
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
      <form onsubmit={()=>{handleSubmit()}} class="flex gap-2 items-center">
        <div class="min-w-48 font-bold">
          Add Collaborators:
        </div>
        <input bind:value={tempuser} placeholder="Collaborator Name (i.e. John Smith)" class="border-b-2 outline-none w-full"/>
        <button class="bg-stone-200 px-2 py-1 rounded-md font-mono w-20">Add</button>
      </form>
      
      <div class="flex flex-col">
        <div class='font-bold'>Current Collaborators:</div>
        <div class="flex flex-wrap w-full gap-2">
          {#each users as user, i}
            <div>{user.name}, </div>
          {/each}
        </div>
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
