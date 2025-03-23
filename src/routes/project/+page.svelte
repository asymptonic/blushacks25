<script lang="ts">
  import NumberFlow from '@number-flow/svelte';
  import { onMount } from 'svelte';

  onMount(()=>{
    balance = 523.00;
    spending = 214;
    funding = 754;
  });

  let balance: number = $state(0);
  let spending: number = $state(0);
  let funding: number = $state(0);
  let fundraising_progress: number = 50;
  let view: string = $state("1D");
</script>

<div class="h-[95vh] w-full p-2 flex flex-col gap-4 font-mono overflow-hidden">
  <div class="flex justify-between">
    <div>
      Project Name
    </div>
    <div class="border p-2 rounded-md flex gap-2 place-items-center">
      <div>View Mode</div>
      <button onclick={()=>{view="1D"}} class={`p-1 rounded-md border w-12 ${view=="1D"?"font-bold":""} transition-all duration-300 ease-in-out`}>1D</button>
      <button onclick={()=>{view="1W"}} class={`p-1 rounded-md border w-12 ${view=="1W"?"font-bold":""} transition-all duration-300 ease-in-out`}>1W</button>
      <button onclick={()=>{view="1M"}} class={`p-1 rounded-md border w-12 ${view=="1M"?"font-bold":""} transition-all duration-300 ease-in-out`}>1M</button>
      <button onclick={()=>{view="1Y"}} class={`p-1 rounded-md border w-12 ${view=="1Y"?"font-bold":""} transition-all duration-300 ease-in-out`}>1Y</button>
      <button onclick={()=>{view="MAX"}} class={`p-1 rounded-md border w-12 ${view=="MAX"?"font-bold":""} transition-all duration-300 ease-in-out`}>MAX</button>
    </div>
  </div>
  <div class="flex justify-between gap-4">
    <div class="w-full h-24 border shadow-md rounded-md p-2 flex flex-col items-center">
      <div>Current Balance</div>
      <div class="text-4xl flex-grow grid place-items-center">
        <NumberFlow
          value={balance}
          format={{ style: 'currency', currency: 'USD'}}
        />
      </div>
    </div>
    <div class="w-full h-24 border shadow-md rounded-md p-2 flex flex-col items-center">
      <div>Current Expenses</div>
      <div class="text-4xl flex-grow flex place-items-center">
        <NumberFlow
          value={spending}
          format={{ style: 'currency', currency: 'USD'}}
        />
      </div>
    </div>
    <div class="w-full h-24 border shadow-md rounded-md p-2 flex flex-col items-center">
      <div>Current Funds Raised</div>
      <div class="text-4xl flex-grow grid place-items-center">
        <NumberFlow
          value={funding}
          format={{ style: 'currency', currency: 'USD'}}
        />
      </div>
    </div>
  </div>
  <div class="flex justify-between gap-4">
    <div class="flex-grow border shadow-md rounded-md p-2">
      <div>Chart here</div>
    </div>
    <div class="w-[40rem] h-80 border shadow-md rounded-md p-2 flex flex-col gap-4 overflow-y-scroll custom-scrollbar">
      <div class="text-lg font-bold -mb-4">Transactions</div>
      <div class="flex gap-2 justify-between w-full border p-2 rounded-md bg-gradient-to-l from-emerald-100 to-transparent from-[0%] to-[40%]">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <div class="px-2">
              Monthly financial contribution
            </div>
            <div class="flex gap-1 text-[0.8rem]">
              <div class="px-2">
                From PERSON to COMPANY
              </div>
              <div>
                •
              </div>
              <div class="px-2">
                DATE
              </div>
            </div>
          </div>
          <div class="flex gap-6 text-sm w-fit px-2 items-center">
            <div class="bg-stone-200 p-1 px-2 rounded-md">
              Contribution #69
            </div>
            <button onclick={()=>{console.log("details")}} class="bg-emerald-200 p-1 px-2 rounded-md hover:bg-emerald-300 transition-color duration-300 ease-in-out">
              View Details
            </button>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div>
            + $5.00 USD
          </div>
          <div class="text-right">
            Completed!
          </div>
        </div>
      </div>
      <!-- Additional transaction entries... -->
      <div class="flex gap-2 justify-between w-full border p-2 rounded-md bg-gradient-to-l from-emerald-100 to-transparent from-[0%] to-[40%]">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <div class="px-2">
              Monthly financial contribution
            </div>
            <div class="flex gap-1 text-[0.8rem]">
              <div class="px-2">
                From PERSON to COMPANY
              </div>
              <div>
                •
              </div>
              <div class="px-2">
                DATE
              </div>
            </div>
          </div>
          <div class="flex gap-6 text-sm w-fit px-2 items-center">
            <div class="bg-stone-200 p-1 px-2 rounded-md">
              Contribution #69
            </div>
            <button onclick={()=>{console.log("details")}} class="bg-emerald-200 p-1 px-2 rounded-md hover:bg-emerald-300 transition-color duration-300 ease-in-out">
              View Details
            </button>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div>
            + $5.00 USD
          </div>
          <div class="text-right">
            Completed!
          </div>
        </div>
      </div>
      <div class="flex gap-2 justify-between w-full border p-2 rounded-md bg-gradient-to-l from-emerald-100 to-transparent from-[0%] to-[40%]">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <div class="px-2">
              Monthly financial contribution
            </div>
            <div class="flex gap-1 text-[0.8rem]">
              <div class="px-2">
                From PERSON to COMPANY
              </div>
              <div>
                •
              </div>
              <div class="px-2">
                DATE
              </div>
            </div>
          </div>
          <div class="flex gap-6 text-sm w-fit px-2 items-center">
            <div class="bg-stone-200 p-1 px-2 rounded-md">
              Contribution #69
            </div>
            <button onclick={()=>{console.log("details")}} class="bg-emerald-200 p-1 px-2 rounded-md hover:bg-emerald-300 transition-color duration-300 ease-in-out">
              View Details
            </button>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div>
            + $5.00 USD
          </div>
          <div class="text-right">
            Completed!
          </div>
        </div>
      </div>
    </div>
    <div class="w-12 h-full border shadow-md rounded-md p-2 flex flex-col">
      <div class="bg-stone-200 w-full flex-grow"></div>
      <div class="bg-green-500 w-full" style="height: {fundraising_progress}%"></div>
    </div>
  </div>
  <div class="flex justify-between gap-4">
    <div class="w-80 flex flex-col border shadow-md rounded-md p-2 gap-4">
      <div class="font-bold text-lg -mb-4">Milestones</div>
      <div class="flex flex-col">
        <div class="flex justify-between">
          <div>Make Website</div>
          <div>03/28</div>
        </div>
        <div class="w-full flex">
          <div class="bg-emerald-400 w-full h-2" style="width: {fundraising_progress}%"></div>
          <div class="bg-stone-200 w-full h-2 flex-grow"></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between">
          <div>Make Website</div>
          <div>03/28</div>
        </div>
        <div class="w-full flex">
          <div class="bg-emerald-400 w-full h-2" style="width: {fundraising_progress}%"></div>
          <div class="bg-stone-200 w-full h-2 flex-grow"></div>
        </div>
      </div>
    </div>
    <div class="w-80 flex flex-col border shadow-md rounded-md p-2 gap-4">
      <div class="font-bold text-lg -mb-4">Newsletter</div>
      
    </div>
  </div>

</div>

<style>
  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e0; /* Tailwind's gray-300 */
    border-radius: 8px;
  }
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 transparent;
  }
</style>