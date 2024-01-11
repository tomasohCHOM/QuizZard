<section class="flex flex-col gap-4">
	<h2 class="text-xl font-medium md:text-3xl">Create a New Quiz!</h2>

	<form method="PUT" class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<label for="quiz-name">Name of the Quiz</label>
			<input
				required
				name="quiz-name"
				type="text"
				placeholder="Name of the Quiz"
				class="w-[min(24rem,100%)] rounded-lg border-2 border-slate-300 bg-primary p-2 outline-none transition hover:brightness-110"
			/>
		</div>
	</form>
</section>
