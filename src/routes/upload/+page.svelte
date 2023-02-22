<script>
	import { enhance } from '$app/forms';

	let db = new Map();

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	function getName(fullName) {
		const [head, ...tail] = fullName.split('.');
		let mime = tail[tail.length - 1];
		let name = head;
		if (tail.length > 1) {
			name = name + tail.slice(0, -1).join('_');
		}
		return { name, mime };
	}
	function getSize(bite) {
		let toSize = Number(bite) / 1024;
		let postfix = ' KB';
		if (toSize > 1000) {
			toSize = toSize / 1024;
			postfix = ' MB';
		}

		return Number(Math.ceil(toSize).toFixed(2)) + postfix;
	}

	function getBase64(evt) {
		const files = evt.target.files;
		for (const file in files) {
			if (file !== 'length' && file !== 'item') {
				const reader = new FileReader();
				reader.readAsDataURL(files[file]);
				reader.onload = (e) => {
					db.set(files[file].name, {
						size: getSize(files[file].size),
						name: getName(files[file].name).name,
						mime: getName(files[file].name).mime,
						data: e.target.result
					});
				};
			}
		}
	}
</script>

<h1 class="text-3xl font-bold underline">Upload</h1>

<form method="POST" action="?/post" use:enhance>
	<label>
		توکن
		<input type="text" name="token" />
	</label>
	<label>
		ارسال فایل
		<input type="file" multiple name="files" on:change={(events) => getBase64(events)} />
	</label>
	<input type="submit" title="ارسال" />
</form>
<hr />

<ul class="container bg-slate-400">
	<li>{[...db]}</li>
</ul>
