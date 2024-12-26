<script lang="ts">
	import { marked } from 'marked';

	export let invitationLink: string;
	export let questions: { Question: string; Answer: string }[];
</script>

<div
	class="flex flex-col items-center justify-center text-center relative font-cormorantG text-secondary-900 font-normal"
>
	<p class="bigtext">
		Inquiries regarding our Entourage, Attire
		<br />
		and Timeline are addressed in
		<br />
		<a href={invitationLink} class="underline font-semibold" target="_blank">our invitation</a>.
	</p>
	<div class="divider" />
	<div class="subtext details">
		<h1 class="text-7xl font-extrabold pb-4">?</h1>
		<h6>Frequently Asked Questions</h6>
		<ul>
			{#each questions as qna}
				<li>
					<p>
						<span class="font-semibold">{qna.Question}</span>
						<br />
						<span class="italic">{@html marked(qna.Answer)}</span>
					</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	p.bigtext {
		@apply text-5xl p-0 m-0 leading-snug;
	}

	div.divider {
		@apply w-1/4 border-b border-primary-900 mb-[2rem] mt-[5rem];
	}

	div.subtext {
		@apply text-2xl m-0;
	}

	div.subtext h6 {
		@apply pb-10 text-4xl font-black;
	}

	div.details li {
		@apply pb-6;
	}

	@media (max-width: 992px) {
		p.bigtext {
			@apply text-4xl;
		}

		div.subtext h6 {
			@apply text-3xl;
		}
	}

	@media (max-width: 576px) {
		p.bigtext {
			@apply text-xl;
		}
		div.subtext {
			@apply text-sm;
		}

		div.subtext h6 {
			@apply text-xl;
		}

		div.subtext h1 {
			@apply text-5xl;
		}
	}
</style>
