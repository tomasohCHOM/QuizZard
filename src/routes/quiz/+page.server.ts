import type { QuestionSet } from "$lib/shared";
import { error } from "@sveltejs/kit";
import type { Tables } from "../../lib/db/types";
import type { PageServerLoad } from "../$types";

type QuizReturnType = Tables<"quiz"> & { question_set: QuestionSet[] };

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data, error: err } = await supabase.from("quiz").select("").returns<QuizReturnType[]>();

	if (err) {
		error(500, "Server error");
	}

	return { quizzes: data ?? [] };
};
