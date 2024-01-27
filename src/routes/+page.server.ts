import type { QuestionSet } from "$lib/shared";
import { error } from "@sveltejs/kit";
import type { Tables } from "../lib/db/types";
import type { PageServerLoad } from "./$types";

type QuizReturnType = Tables<"quiz"> & { question_set: QuestionSet[] };

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const { data: recentQuizzes, error: recentQuizzesError } = await supabase
		.from("quiz")
		.select("")
		.limit(8)
		.returns<QuizReturnType[]>();

	if (recentQuizzesError) {
		error(500, "Server error");
	}

	const session = await getSession();

	let userQuizzes: QuizReturnType[] | null = [];
	let userQuizzesErr;

	if (session) {
		const { data, error } = await supabase
			.from("quiz")
			.select("")
			.eq("user_id", session.user.id!)
			.returns<QuizReturnType[]>();

		userQuizzes = data;
		userQuizzesErr = error;
	}

	if (userQuizzesErr) {
		error(500, "Server error");
	}

	return { recentQuizzes: recentQuizzes ?? [], userQuizzes: userQuizzes ?? [] };
};
