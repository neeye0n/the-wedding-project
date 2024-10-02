<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	function ping() {
		const t: ToastSettings = {
			message: 'yo welcome, this site is still in construction. come back later.'
		};
		toastStore.trigger(t);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center text-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<button class="btn btn-lg variant-filled" on:click={ping}>Test Button</button>
	</div>
</div>
