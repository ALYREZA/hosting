import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: vitePreprocess()
	}
});
