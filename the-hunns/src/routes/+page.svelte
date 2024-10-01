<!-- src/routes/+page.svelte -->
<script>
	let weddingInfo = {
		title: 'Our Wedding Day',
		date: 'December 15, 2024',
		location: 'Beautiful Garden Venue',
		description: 'Join us for a day of celebration, love, and joy!'
	};
</script>

<main>
	<section id="home">
		<h1>{weddingInfo.title}</h1>
		<p>Date: {weddingInfo.date}</p>
		<p>Location: {weddingInfo.location}</p>
		<p>{weddingInfo.description}</p>
	</section>

	<!-- You can add more sections as needed for single scrolling -->
	<section id="details">
		<h2>Event Details</h2>
		<p>Details about the ceremony, reception, etc.</p>
	</section>

	<section id="rsvp">
		<h2>RSVP</h2>
		<p>We would love to have you with us!</p>
	</section>
</main>

<style>
	main {
		padding: 20px;
		font-family: Arial, sans-serif;
	}
	section {
		margin-bottom: 40px;
	}
</style>
