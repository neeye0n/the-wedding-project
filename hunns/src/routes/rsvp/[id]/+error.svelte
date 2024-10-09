<script lang="ts">
	import { page } from '$app/stores';

	let title = 'Error';
	let message = 'An unexpected error occurred.';

	// Check for error and update the title and message accordingly
	$: if ($page.error) {
		const pageMessages = $page.error.message.split('||');
		title = pageMessages[0] || 'Error';
		message = pageMessages[1] || 'An unexpected error occurred.';
	}
</script>

<meta name="viewport" content="width=device-width, initial-scale=0.9" />
<main>
	<div class="flex items-center justify-center min-h-screen" style="font-family: Avenir LT Std;">
		<div class="card w-100 variant-filled block card-hover p-4">
			<div
				class="card-header border-b-[2px] border-primary-900 text-xl text-center font-black mb-2 pb-2"
			>
				{title}
			</div>
			<p class="class text-center text-md">
				{message}
			</p>
		</div>
	</div>
</main>
