import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Tables } from "$lib/db/types";
import type { QuestionSet } from "$lib/shared";

type QuizReturnType = Tables<"quiz"> & { question_set: QuestionSet[] };

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const pageNumber = Number(params.slug);
	if (isNaN(pageNumber)) {
		throw error(404, "Not found");
	}

	const { data, error: err } = await supabase
		.from("quiz")
		.select("")
		.range(0 + (pageNumber - 1) * 8, 7 + (pageNumber - 1) * 8)
		.returns<QuizReturnType[]>();

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
