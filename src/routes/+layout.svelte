<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<div class="relative flex flex-1 min-h-screen justify-center mt-3">
	<div class="w-4/5 bg-zinc-100">
		<Nav />
		<div class=" min-h-screen">
			<slot />
		</div>
		<Footer />
	</div>
</div>
