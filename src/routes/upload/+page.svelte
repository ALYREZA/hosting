<script>
	import { enhance } from '$app/forms';

	let db = new Map();

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	let getName = (fullName) => {
		const [head, ...tail] = fullName.split('.');
		let mime = tail[tail.length - 1];
		let name = head;
		if (tail.length > 1) {
			name = name + tail.slice(0, -1).join('_');
		}
		return { name, mime };
	};
	function getSize(bite) {
		let toSize = Number(bite) / 1024;
		let postfix = ' KB';
		if (toSize > 1000) {
			toSize = toSize / 1024;
			postfix = ' MB';
		}

		return Number(Math.ceil(toSize).toFixed(2)) + postfix;
	}

	const getBase64 = (evt) => {
		const files = evt.target.files;
		for (const file in files) {
			if (file !== 'length' && file !== 'item') {
				const reader = new FileReader();
				reader.readAsDataURL(files[file]);
				reader.onloadend = (e) => {
					db = db.set(files[file].name, {
						size: getSize(files[file].size),
						name: getName(files[file].name).name,
						mime: getName(files[file].name).mime,
						data: e.target.result
					});
				};
			}
		}
	};

	const removeFile = async (event, key) => {
		event.preventDefault();
		if (db.has(key)) {
			await db.delete(key);
			db = db;
		}
	};
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
	<input type="submit" value="آپلود" />
</form>
<hr />

<table class="table">
	<thead>
		<tr>
			<th>نام</th>
			<th>سایز</th>
			<th>حذف</th>
		</tr>
	</thead>
	<tbody>
		{#each [...db] as [key, value] (key)}
			<tr {key}>
				<td>{value.name}</td>
				<td>{value.size}</td>
				<td><button on:click={(event) => removeFile(event, key)}>حذف</button></td>
			</tr>
		{/each}
	</tbody>
</table>
