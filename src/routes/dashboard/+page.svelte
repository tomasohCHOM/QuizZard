<script lang="ts">
	import type { PageData } from "../$types";

	export let data: PageData;
</script>

<h2>Hello, {data.session?.user.email}!</h2>

<form action="/logout" method="post">
	<button type="submit">Log Out</button>
</form>
