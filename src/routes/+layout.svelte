<script lang="ts">
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<button onclick={() => {
	toggleMode();
}}
class="p-2 border active:scale-95 transition-all duration-100 ease-in-out"
>swith mode</button>

<ModeWatcher />
{@render children()}
