import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		error(401, "Unauthorized");
	}

	const pageNumber = Number(params.slug);
	if (isNaN(pageNumber)) {
		error(404, "Not found");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.select("id, name, quiz_length, user_id")
		.eq("user_id", session.user.id)
		.range(0 + (pageNumber - 1) * 8, 7 + (pageNumber - 1) * 8);

	if (err) {
		error(500, "Server error");
	}

	const { count: numQuizzes, error: countErr } = await supabase
		.from("quiz")
		.select("*", { count: "exact", head: true });

	if (countErr || !numQuizzes) {
		error(500, "Server error");
	}

	return { quizzes: data ?? [], pageNumber, numQuizzes };
};

export const actions: Actions = {
	search: async ({ request, locals: { getSession, supabase } }) => {
		const session = await getSession();
		if (!session) {
			error(401, "Unauthorized");
		}
		const formData = await request.formData();
		const searchQuery = formData.get("quiz-search-bar")?.toString();
		if (!searchQuery) {
			return fail(400, { fail: "Search query is empty" });
		}
		const { data, error: err } = await supabase
			.from("quiz")
			.select("id, name, quiz_length, user_id")
			.eq("user_id", session.user.id);
		if (err) {
			error(500, "Server error");
		}
		const searchResults = data.filter((quiz) => quiz.name.toLowerCase().includes(searchQuery));
		return { searchResults: searchResults };
	},
	reset: async () => {
		return;
	}
};
