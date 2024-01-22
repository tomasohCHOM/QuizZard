import type { QuestionSet } from "$lib/shared";
import type { Tables } from "../lib/db/types";
import type { PageServerLoad } from "./$types";

interface QuizReturnType {
	quizzes: {
		question_set: QuestionSet;
	};
}

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const quizzes = await supabase
		.from("quiz")
		.select("")
		.returns<Tables<"quiz" & QuizReturnType>[]>();

	return { quizzes: quizzes.data ?? [] };
};
