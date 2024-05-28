<script lang="ts">
	import { page } from "$app/stores";
</script>

<section class="grid items-center justify-center gap-4">
	<h1 class="text-center text-3xl">
		<span class="font-bold">{$page.status}</span> |
		<span class="font-medium">
			{$page.error?.message}
		</span>
	</h1>
	<div class="flex gap-2">
		<a href="/" class="quiz-btn w-max">Go Back Home</a>
		<a href="/quizzes" class="quiz-btn-contrast w-max">Explore Quizzes</a>
	</div>
</section>
