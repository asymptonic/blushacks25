<script lang="ts">
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<!-- <button
	onclick={() => {
		toggleMode();
	}}
	class="border p-2 transition-all duration-100 ease-in-out active:scale-95"
>
	swith mode
</button> -->
<!-- <Navbar /> -->
<ModeWatcher />
<Toaster />
{@render children()}
