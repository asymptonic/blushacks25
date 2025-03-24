<script lang="ts">
    import { page } from '$app/state';
    import { pb, user } from '$lib/pocketbase.svelte';
    import { House } from 'lucide-svelte'
  </script>
  
  <div class="sticky top-0 shadow-md border-b border-neutral-300 z-50 bg-white">
      <div class="mx-auto px-5 py-3">
      <div class="flex justify-between mb-3">
        <div class="font-bold text-2xl flex item-center gap-3">
          <div>
            <a href="/dashbboard" class="flex items-center gap-2">
              <House size="24" />
            </a>
        </div>
        </div>
      </div>
      </div>
  </div>